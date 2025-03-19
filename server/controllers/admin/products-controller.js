const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

// const handleImageUpload = async (req, res) => {
//   try {
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     const url = "data:" + req.file.mimetype + ";base64," + b64;
//     const result = await imageUploadUtil(url);

//     res.json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error occured",
//     });
//   }
// };


async function handleImagesUpload(req, res) {
  try {
    const files = req.files;
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.path)
    );

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      results: results.map((result) => result.secure_url),
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading images",
    });
  }
}


//add a new product
// const addProduct = async (req, res) => {
//   try {
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//       color,
//       size,
//       quantityPrices,
//       partition,
//       partitionId,
//     } = req.body;

//     console.log(averageReview, "averageReview");

//     const newlyCreatedProduct = new Product({
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//       color,
//       size,
//       quantityPrices,
//       partition,
//       partitionId,
//     });

//     await newlyCreatedProduct.save();
//     res.status(201).json({
//       success: true,
//       data: newlyCreatedProduct,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occurred",
//     });
//   }
// };

// const addProduct = async (req, res) => {
//   try {
//     let { partitionId, ...rest } = req.body;

//     console.log("🔍 Received partitionId:", partitionId); // التحقق من القيمة المستلمة

//     // ✅ التحقق من أن partitionId موجود
//     if (!partitionId) {
//       console.error("❌ partitionId مفقود!");
//       return res.status(400).json({ message: "❌ partitionId مطلوب" });
//     }

//     // ✅ التحقق من أن partitionId صالح
//     if (typeof partitionId === "string") {
//       if (mongoose.Types.ObjectId.isValid(partitionId)) {
//         partitionId = new mongoose.Types.ObjectId(partitionId); // تحويل إلى ObjectId
//       } else {
//         console.error("❌ partitionId غير صالح:", partitionId);
//         return res.status(400).json({ message: "❌ partitionId غير صالح، يرجى إرسال ID صحيح" });
//       }
//     } else if (!mongoose.Types.ObjectId.isValid(partitionId)) {
//       console.error("❌ partitionId غير صالح:", partitionId);
//       return res.status(400).json({ message: "❌ partitionId يجب أن يكون ObjectId صحيح" });
//     }

//     console.log("✅ partitionId بعد المعالجة:", partitionId);

//     // ✅ إنشاء المنتج وحفظه في قاعدة البيانات
//     const newProduct = new Product({ partitionId, ...rest });
//     await newProduct.save();

//     console.log("🎉 منتج تمت إضافته بنجاح:", newProduct);
//     res.status(201).json({ message: "✅ تم إضافة المنتج بنجاح", product: newProduct });
//   } catch (error) {
//     console.error("❌ Error Adding Product:", error);
//     res.status(500).json({ message: "❌ حدث خطأ أثناء إضافة المنتج", error: error.message });
//   }
// };

const addProduct = async (req, res) => {
  try {
    let { partitionId, ...rest } = req.body;

    console.log("🔍 Received partitionId:", partitionId); // التحقق من القيمة المستلمة

    // ✅ التحقق من أن partitionId موجود وصالح
    if (partitionId) {
      if (typeof partitionId === "string" && mongoose.Types.ObjectId.isValid(partitionId)) {
        partitionId = new mongoose.Types.ObjectId(partitionId); // تحويل إلى ObjectId
      } else if (!mongoose.Types.ObjectId.isValid(partitionId)) {
        console.error("❌ partitionId غير صالح:", partitionId);
        return res.status(400).json({ message: "❌ partitionId غير صالح، يرجى إرسال ID صحيح" });
      }
    } else {
      console.log("⚠️ لا يوجد partitionId، سيتم حفظ المنتج بدون برتيشن.");
      partitionId = undefined; // لا يتم تضمين `partitionId` في البيانات
    }

    console.log("✅ partitionId بعد المعالجة:", partitionId);

    // ✅ إنشاء المنتج وحفظه في قاعدة البيانات
    const newProduct = new Product({ ...(partitionId && { partitionId }), ...rest });
    await newProduct.save();

    console.log("🎉 منتج تمت إضافته بنجاح:", newProduct);
    res.status(201).json({ message: "✅ تم إضافة المنتج بنجاح", product: newProduct });
  } catch (error) {
    console.error("❌ Error Adding Product:", error);
    res.status(500).json({ message: "❌ حدث خطأ أثناء إضافة المنتج", error: error.message });
  }
};

//fetch all products

// const fetchAllProducts = async (req, res) => {
//   try {
//     const listOfProducts = await Product.find({});
//     res.status(200).json({
//       success: true,
//       data: listOfProducts,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occurred",
//     });
//   }
// };

const fetchAllProducts = async (req, res) => {
  try {
    const { partitionId } = req.query; // ✅ جلب partitionId من الـ query

    let filter = {};
    if (partitionId) {
      filter.partitionId = partitionId; // ✅ فلترة المنتجات حسب partitionId
    }

    const listOfProducts = await Product.find(filter); // ✅ تطبيق الفلتر
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};


//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
      color,
      size,
      quantityPrices,
      partition,
      isHidden,
      partitionId,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.color = color || findProduct.color;
    findProduct.size = size || findProduct.size;
    findProduct.averageReview = averageReview || findProduct.averageReview;
    findProduct.quantityPrices = quantityPrices || findProduct.quantityPrices;
    findProduct.isHidden = isHidden !== undefined ? isHidden : findProduct.isHidden;
    findProduct.partition = partition || findProduct.partition;
    findProduct.partitionId = partitionId || findProduct.partitionId;
  

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  handleImagesUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};