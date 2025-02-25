const paymob = require("../../helpers/paymob");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // استخدم Gmail أو أي مزود آخر
  auth: {
    user: "watermelonofficial264@gmail.com",
    pass: "wjty ibqr qxpm idnc", // استخدم App Password لو Gmail
  },
});

const sendOrderNotification = async (order) => {
  try {
    if (!order) {
      throw new Error("❌ البيانات غير متوفرة لإرسال الإشعار!");
    }

    const mailOptions = {
      from: '"Your Store" <watermelonofficial264@gmail.com>',
      to: "watermelonofficial264@gmail.com", // الإيميل اللي هيوصله الإشعار
      subject: "📦 طلب جديد!",
      text: `لقد استقبلت طلبًا جديدًا!
      \n🔹 رقم الطلب: ${order._id}
      \n👤 العميل: ${order.addressInfo.fullName}
      \n📞 رقم الهاتف: ${order.addressInfo.phone}
      \n📧 البريد الإلكتروني: ${order.addressInfo?.email}
      \n🛒 المنتجات:
      ${order.cartItems
        .map((item) => `- ${item.title} (x${item.quantity})`)
        .join("\n")}
      \n💰 الإجمالي: ${order.totalAmount} EGP`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 إيميل الإشعار تم إرساله بنجاح!");
  } catch (error) {
    console.error("❌ فشل إرسال الإيميل:", error);
  }
};

const initiatePayment = async (req, res) => {
  try {
    const { amount, billingData, orderData, paymentMethod } = req.body;

    if (!amount || !orderData || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "❌ الحقول المطلوبة غير مكتملة!",
      });
    }

    // التأكد من وجود بيانات العميل
    orderData.customerName = orderData.addressInfo.fullName;
    orderData.customerPhone = orderData.addressInfo.phone;

    let order;

    if (paymentMethod === "cod") {
      order = new Order({
        ...orderData,
        orderStatus: "pending",
        paymentMethod: "cod",
        paymentStatus: "pending",
        totalAmount: amount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      });

      const savedOrder = await order.save();
      await sendOrderNotification(savedOrder); // ✅ تم إصلاح تمرير الطلب

      return res.status(200).json({
        success: true,
        message: "✅ تم إنشاء الطلب بنجاح!",
        orderId: savedOrder._id,
      });
    } else if (paymentMethod === "paymob") {
      const authToken = await paymob.authenticate();
      const paymobOrderId = await paymob.createOrder(authToken, amount);

      order = new Order({
        ...orderData,
        orderStatus: "pending",
        paymentMethod: "paymob",
        paymentStatus: "pending",
        totalAmount: amount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        paymobOrderId: paymobOrderId,
      });

      const savedOrder = await order.save();
      await sendOrderNotification(savedOrder); // ✅ تم إصلاح تمرير الطلب

      const paymentKey = await paymob.generatePaymentKey(
        authToken,
        paymobOrderId,
        amount,
        billingData
      );
      return res.status(200).json({
        success: true,
        paymentKey,
        orderId: savedOrder._id,
        paymobOrderId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "❌ طريقة الدفع غير صحيحة!",
      });
    }
  } catch (error) {
    console.error("❌ خطأ في تنفيذ الطلب:", error.message);
    res
      .status(500)
      .json({ success: false, message: "❌ خطأ داخلي في السيرفر" });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // تحديث حالة الدفع بعد النجاح
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId; // هنا تقوم بتخزين paymentId من Paymob في order
    order.payerId = payerId;

    // معالجة المنتجات وخصم الكمية
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // حذف الـ Cart المرتبط بالطلب
    await Cart.findByIdAndDelete(order.cartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      paymentId, // إرجاع الـ paymentId في الاستجابة بعد التحقق من الدفع
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log("Error fetching orders by user:", e.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log("Error fetching order details:", e.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching order details",
    });
  }
};

module.exports = {
  initiatePayment,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
