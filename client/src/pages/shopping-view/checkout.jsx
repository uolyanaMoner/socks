import Address from "@/components/shopping-view/address";
import img from "../../assets/cover.jpeg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { shippingCosts } from "@/config";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [government, setGovernment] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(""); // حفظ طريقة الدفع المختارة
  const userId = user?.id || localStorage.getItem("guestUserId");
  const { productList } = useSelector((state) => state.shopProducts);

  // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
  if (!userId) {
    const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
    localStorage.setItem("guestUserId", generatedUserId); // حفظه في localStorage
  }


  const handlePaymentSelection = async () => {
    if (paymentMethod === "") {
      alert("من فضلك اختر طريقة الدفع");
      return;
    }

    if (paymentMethod === "paymob") {
      handlePaymobPayment("paymob");
    } else if (paymentMethod === "cod") {
      handlePayment("cod");
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setGovernment(selectedProvince);
    setShippingCost(shippingCosts[selectedProvince]);
  };
  
  // دالة لحساب السعر بناءً على الكمية (سواء كان مخصومًا أم لا)
  const getPriceForQuantity = (productId, quantity) => {
    const product = productList?.find((item) => item._id === productId);
  
    // البحث عن السعر الخاص بالكمية المحددة
    const quantityPrice = product?.quantityPrices?.find(
      (item) => item.quantity === quantity
    );
  
    // إذا كان هناك سعر مخصص للكمية، نرجع السعر المخصوم إذا وجد أو السعر العادي للكمية
    if (quantityPrice) {
      return quantityPrice.discountedPrice || quantityPrice.price;
    }
  
    // إذا لم يكن هناك سعر خاص بالكمية، نستخدم السعر الأساسي للمنتج
    return product?.salePrice > 0
      ? product.salePrice * quantity
      : product?.price * quantity || 0;
  };
  
  // حساب إجمالي المبلغ في التوتال (دون الشحن)
  const totalCartAmountBeforeDiscount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          const itemTotal = getPriceForQuantity(
            currentItem?.productId,
            currentItem?.quantity
          );
          return sum + itemTotal;
        }, 0)
      : 0;
  
  // حساب إجمالي الكمية في السلة
  const totalQuantityInCart = cartItems?.items?.reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );
  
  // حساب إجمالي التوتال بعد إضافة تكلفة الشحن
  const totalCartAmount = totalCartAmountBeforeDiscount + shippingCost;
  
  // طباعة القيم للتأكد من صحة الحساب
  console.log("Total Before Shipping: ", totalCartAmountBeforeDiscount);
  console.log("Shipping Cost: ", shippingCost);
  console.log("Final Total: ", totalCartAmount);
  
 
  // const discount =
  //   cartItems && cartItems.items && cartItems.items.length > 0
  //     ? cartItems.items.reduce((sum, currentItem) => {
  //         const itemPrice =
  //           currentItem?.salePrice > 0
  //             ? currentItem?.salePrice
  //             : currentItem?.price;

  //         // حساب إجمالي الكمية في السلة
  //         const totalQuantityInCart = cartItems.items.reduce(
  //           (total, item) => total + (item?.quantity || 0),
            // 0
  //         );

  //         // إذا كانت الكمية 6 من نفس المنتج أو إجمالي الكمية في السلة 6 أو أكثر
  //         if (currentItem?.quantity === 6 || totalQuantityInCart === 6) {
  //           return sum + itemPrice * currentItem.quantity * 0.1; // خصم 10%
  //         }

  //         // إذا كانت الكمية 12 من نفس المنتج أو إجمالي الكمية في السلة 12 أو أكثر
  //         if (currentItem?.quantity === 12 || totalQuantityInCart === 12) {
  //           return sum + itemPrice * currentItem.quantity * 0.2; // خصم 20%
  //         }

  //         return sum; // لا خصم إذا لم يتحقق أي شرط
  //       }, 0)
  //     : 0; // إذا كانت العربة فارغة، لا يوجد خصم


      
  const handlePaymobPayment = async (method) => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
         style: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom:  "20px" , // أسفل الصفحة عند الموبايل
          },
      });
      return;
    }

    if (!government) {
      toast({
        title: "Please select your government to proceed.",
        variant: "destructive",
         style: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom:  "20px" , // أسفل الصفحة عند الموبايل
          },
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom:  "20px" , // أسفل الصفحة عند الموبايل
        },
      });
      return;
    }

    if (government === null) {
      toast({
        title: "Please select your government to proceed.",
        variant: "destructive",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom:  "20px" , // أسفل الصفحة عند الموبايل
        },
      });
      return;
    }

    try {
      // بيانات الفواتير كمثال
      const billingData = {
        first_name: user?.userName || "N/A",
        last_name: "..",
        email: user?.email,
        phone_number: currentSelectedAddress?.phone,
        country: "EG",
        city: currentSelectedAddress?.city,
        street: currentSelectedAddress?.address,
        building: currentSelectedAddress?.building || "N/A",
        postalCode: currentSelectedAddress?.postalCode || "00000",
        floor: currentSelectedAddress?.floor || "N/A",
        apartment: currentSelectedAddress?.apartment || "N/A",
      };

      const orderData = {
        userId: userId,
        cartId: cartItems?._id,
        cartItems: cartItems.items.map((singleCartItem) => ({
          productId: singleCartItem?.productId,
          title: singleCartItem?.title,
          image: singleCartItem?.image,
          color: singleCartItem?.color,
          size: singleCartItem?.size,
          additionalDetails: singleCartItem?.additionalDetails,
          price:
            singleCartItem?.salePrice > 0
              ? singleCartItem?.salePrice
              : singleCartItem?.price,
          quantity: singleCartItem?.quantity,
        })),
        addressInfo: {
          addressId: currentSelectedAddress?._id,
          address: currentSelectedAddress?.address,
          city: government,
          fullName:currentSelectedAddress?.fullName,
          phone: currentSelectedAddress?.phone,
          email: currentSelectedAddress?.email,
          notes: currentSelectedAddress?.notes,
          apartment: currentSelectedAddress?.apartment || "N/A",
          floor: currentSelectedAddress?.floor || "N/A",
          building: currentSelectedAddress?.building || "N/A",
          postalCode: currentSelectedAddress?.postalCode || "00000",
        },
        orderStatus: "pending",
        paymentMethod: "paymob",
        paymentStatus: "pending",
        totalAmount: totalCartAmount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      };

      // طلب POST إلى السيرفر لإنشاء الطلب
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalCartAmount, // المبلغ بالجنيه المصري
            billingData,
            orderData,
            paymentMethod: method,
          }),
        }
      );

      const data = await response.json();
      console.log(data); // سيتم تضمين الـ orderId و paymentKey هنا
      sessionStorage.setItem("currentOrderId", data.orderId);
      sessionStorage.setItem("paymentMethod", "paymob"); // إذا كانت الطريقة عبر Paymob
      // نقل الـ orderId و paymentId إلى صفحة الدفع (iframe)
      const orderId = data.orderId; // قم بإرجاع الـ orderId من الخادم بعد إنشاء الطلب
      const paymentId = data.paymentId; // قم بإرجاع الـ paymentId من Paymob بعد التحقق من الدفع
      const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/881668?payment_token=${data.paymentKey}&order_id=${orderId}&payment_id=${paymentId}`;

      window.location.href = iframeUrl; // فتح صفحة الدفع في المتصفح
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error: " + error.message); // تنبيه المستخدم بوجود خطأ
    }
  };

  // const handlePayment = async (method) => {


  //   if (cartItems.length === 0) {
  //     toast({
  //       title: "Your cart is empty. Please add items to proceed",
  //       variant: "destructive",
  //       style: {
  //         position: "fixed",
  //         left: "50%",
  //         transform: "translateX(-50%)",
  //         bottom:  "20px" , // أسفل الصفحة عند الموبايل
  //       },
  //     });
  //     return;
  //   }

  //   if (currentSelectedAddress === null) {
  //     toast({
  //       title: "Please select one address to proceed.",
  //       variant: "destructive",
  //       style: {
  //         position: "fixed",
  //         left: "50%",
  //         transform: "translateX(-50%)",
  //         bottom:  "20px" , // أسفل الصفحة عند الموبايل
  //       },
  //     });
  //     return;
  //   }

  //   if (!government) {
  //     toast({
  //       title: "Please select your government to proceed.",
  //       variant: "destructive",
  //       style: {
  //         position: "fixed",
  //         left: "50%",
  //         transform: "translateX(-50%)",
  //         bottom:  "20px" , // أسفل الصفحة عند الموبايل
  //       },
  //     });
  //     return;
  //   }

  //   const billingData = {
  //     first_name: user?.userName || "N/A",
  //     last_name: "..",
  //     email: user?.email,
  //     phone_number: currentSelectedAddress?.phone,
  //     country: "EG",
  //     city: currentSelectedAddress?.city,
  //     street: currentSelectedAddress?.address,
  //     building: currentSelectedAddress?.building || "N/A",
  //     postalCode: currentSelectedAddress?.postalCode || "00000",
  //     floor: currentSelectedAddress?.floor || "N/A",
  //     apartment: currentSelectedAddress?.apartment || "N/A",
  //   };

  //   const orderData = {
  //     userId: userId,
  //     cartId: cartItems?._id,
  //     cartItems: cartItems.items.map((singleCartItem) => ({
  //       productId: singleCartItem?.productId,
  //       title: singleCartItem?.title,
  //       image: singleCartItem?.image,
  //       color: singleCartItem?.color,
  //       size: singleCartItem?.size,
  //       additionalDetails: singleCartItem?.additionalDetails,
  //       price:
  //         singleCartItem?.salePrice > 0
  //           ? singleCartItem?.salePrice
  //           : singleCartItem?.price,
  //       quantity: singleCartItem?.quantity,
  //     })),
  //     addressInfo: {
  //       addressId: currentSelectedAddress?._id,
  //       address: currentSelectedAddress?.address,
  //       city: government,
  //       phone: currentSelectedAddress?.phone,
  //       fullName:currentSelectedAddress?.fullName,
  //       email: currentSelectedAddress?.email,
  //       notes: currentSelectedAddress?.notes,
  //       apartment: currentSelectedAddress?.apartment || "N/A",
  //       floor: currentSelectedAddress?.floor || "N/A",
  //       building: currentSelectedAddress?.building || "N/A",
  //       postalCode: currentSelectedAddress?.postalCode || "00000",
  //     },
  //     orderStatus: "pending",
  //     paymentMethod: "COD",
  //     paymentStatus: "pending",
  //     totalAmount: totalCartAmount,
  //     orderDate: new Date(),
  //     orderUpdateDate: new Date(),
  //   };

  //   const response = await fetch(
  //     `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: totalCartAmount,
  //         billingData,
  //         orderData,
  //         paymentMethod: method,
  //       }),
  //     }
  //   );

  //   const result = await response.json();
  //   console.log("Server Response: ", result);

  //   if (method === "cod") {
  //     if (result?.success) {
  //       // حفظ orderId في sessionStorage
  //       sessionStorage.setItem("currentOrderId", result?.orderId);
  //       sessionStorage.setItem("paymentMethod", "cod"); // إذا كانت الطريقة هي الدفع عند الاستلام

  //       // الانتقال إلى paymob-return بعد حفظ الـ orderId
  //       // window.location.href = `${import.meta.env.VITE_API_URL}/shop/paymob-return`;
  //       navigate("/shop/paymob-return");
  //     } else {
  //       toast({
  //         title: "Failed to create order. Try again.",
  //         variant: "destructive",
  //         style: {
  //           position: "fixed",
  //           left: "50%",
  //           transform: "translateX(-50%)",
  //           bottom:  "20px" , // أسفل الصفحة عند الموبايل
  //         },
  //       });
  //     }
  //   }
  // };


  const handlePayment = async (method) => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom:  "20px",
        },
      });
      return;
    }
  
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom:  "20px",
        },
      });
      return;
    }
  
    if (!government) {
      toast({
        title: "Please select your government to proceed.",
        variant: "destructive",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom:  "20px",
        },
      });
      return;
    }
  
    const billingData = {
      first_name: user?.userName || "N/A",
      last_name: "..",
      email: user?.email,
      phone_number: currentSelectedAddress?.phone,
      country: "EG",
      city: currentSelectedAddress?.city,
      street: currentSelectedAddress?.address,
      building: currentSelectedAddress?.building || "N/A",
      postalCode: currentSelectedAddress?.postalCode || "00000",
      floor: currentSelectedAddress?.floor || "N/A",
      apartment: currentSelectedAddress?.apartment || "N/A",
    };
  
    const orderData = {
      userId: userId,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        color: singleCartItem?.color || localStorage.getItem(`selectedColor-${singleCartItem.productId}`), // استخدام اللون المختار
        size: singleCartItem?.size,
        additionalDetails: singleCartItem?.additionalDetails,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: government,
        phone: currentSelectedAddress?.phone,
        fullName: currentSelectedAddress?.fullName,
        email: currentSelectedAddress?.email,
        notes: currentSelectedAddress?.notes,
        apartment: currentSelectedAddress?.apartment || "N/A",
        floor: currentSelectedAddress?.floor || "N/A",
        building: currentSelectedAddress?.building || "N/A",
        postalCode: currentSelectedAddress?.postalCode || "00000",
      },
      orderStatus: "pending",
      paymentMethod: method,
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      totalPrice: totalCartAmountBeforeDiscount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };
  sessionStorage.setItem("orderTime", orderData.orderTime);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalCartAmount,
          billingData,
          orderData,
          paymentMethod: method,
        }),
      }
    );
  
    const result = await response.json();
    console.log("Server Response: ", result);
  
    if (method === "cod") {
      if (result?.success) {
        // حفظ orderId في sessionStorage
        sessionStorage.setItem("currentOrderId", result?.orderId);
        sessionStorage.setItem("paymentMethod", "cod");
        console.log("Order Data Before Sending:", orderData);

        navigate("/shop/paymob-return");
      } else {
        toast({
          title: "Failed to create order. Try again.",
          variant: "destructive",
          style: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom:  "20px",
          },
        });
      }
    }
  };
  

  console.log("Total Before Discount:", totalCartAmountBeforeDiscount);
  console.log("Total with Shipping:", totalCartAmount);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-1">
            <Label>Choose your government</Label>
            <select
              value={government}
              onChange={handleProvinceChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="0">اختار محافظتك</option>
              {Object.entries(shippingCosts).map(([province]) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-1">
            <Label> Choose payment method</Label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">اختيار طريقة الدفع</option>
              {/* <option value="paymob">Paymob</option> */}
              <option value="cod">دفع عند الاستلام</option>
            </select>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Discount</span>
              {/* <span className="font-bold">{discount.toFixed(2)} EGP</span> */}
              <span className="font-bold">50%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Shipping Cost</span>
              <span className="font-bold">{shippingCost.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                {totalCartAmount.toFixed(2)} EGP
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mt-4">
              <Button onClick={handlePaymentSelection} className="w-full">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;