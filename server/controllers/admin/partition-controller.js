const Partition = require("../../models/Partition");

// ✅ جلب جميع البرتيشنات
const getPartitions = async (req, res) => {
  try {
    const partitions = await Partition.find();
    res.status(200).json({ success: true, partitions });
  } catch (error) {
    console.error("❌ خطأ أثناء جلب البرتيشنات:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ إضافة برتيشن جديد
const addPartition = async (req, res) => {
  try {
    const { title, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !link || !image) {
      return res.status(400).json({ success: false, message: "جميع الحقول مطلوبة" });
    }

    const newPartition = new Partition({ title, image, link });
    await newPartition.save();

    res.status(201).json({ success: true, partition: newPartition });
  } catch (error) {
    console.error("❌ خطأ أثناء إضافة البرتيشن:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء إضافة البرتيشن" });
  }
};

// ✅ تعديل برتيشن موجود
const editPartition = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedData = { title, link };
    if (image) updatedData.image = image;

    const updatedPartition = await Partition.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPartition) {
      return res.status(404).json({ success: false, message: "البرتيشن غير موجود" });
    }

    res.status(200).json({ success: true, partition: updatedPartition });
  } catch (error) {
    console.error("❌ خطأ أثناء تعديل البرتيشن:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء تعديل البرتيشن" });
  }
};

// ✅ حذف برتيشن
const deletePartition = async (req, res) => {
  try {
    const { id } = req.params;

    const partition = await Partition.findById(id);
    if (!partition) {
      return res.status(404).json({ success: false, message: "لم يتم العثور على البرتيشن" });
    }

    await Partition.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "تم حذف البرتيشن بنجاح" });
  } catch (error) {
    console.error("❌ خطأ أثناء حذف البرتيشن:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء حذف البرتيشن" });
  }
};

module.exports = {
  getPartitions,
  addPartition,
  editPartition,
  deletePartition,
};
