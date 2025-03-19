import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { addProductFormElements } from "@/config";
import { useDispatch } from "react-redux";
import { addNewProduct } from "@/store/admin/products-slice";
import { useToast } from "@/components/ui/use-toast";
import ObjectId from "bson-objectid";


const AdminPartitions = () => {
  const [partitions, setPartitions] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [productFormData, setProductFormData] = useState({ partition: "", partitionId: "" });
  const [uploadedImages, setUploadedImages] = useState([]);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const storedPartitions = JSON.parse(localStorage.getItem("partitions"));
    if (storedPartitions) {
      setPartitions(storedPartitions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("partitions", JSON.stringify(partitions));
  }, [partitions]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPartition = () => {
    if (!name || !image) return alert("يجب ملء جميع الحقول");
  
    const newPartition = {
      id: ObjectId().toHexString(), // ✅ إنشاء ObjectId مثل Mongoose
      name,
      image,
    };
  
    const updatedPartitions = [...partitions, newPartition]; // تحديث قائمة البرتيشنات
  
    setPartitions(updatedPartitions);
    console.log("🎉 Updated Partitions List:", updatedPartitions); // ✅ عرض جميع البرتيشنات بعد الإضافة
  
    setName("");
    setImage(null);
    setPreview(null);
  };
  

  const handleEditPartition = (partition) => {
    setEditingId(partition.id);
    setName(partition.name);
    setImage(partition.image);
    setPreview(partition.image);
  };

  const handleUpdatePartition = () => {
    setPartitions(partitions.map(p => p.id === editingId ? { id: editingId, name, image } : p));
    setEditingId(null);
    setName("");
    setImage(null);
    setPreview(null);
  };

  const handleDeletePartition = (id) => {
    setPartitions(partitions.filter(p => p.id !== id));
  };

  const handleAddProduct = (partition) => {
    setProductFormData({ partition: partition.name, partitionId: partition.id });
    setOpenSheet(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const productData = {
      ...productFormData,
      image: uploadedImages.join(","),
    };
  
    console.log("🚀 Adding Product with Data:", productData); // تحقق من بيانات المنتج
  
    dispatch(addNewProduct(productData)).then(() => {
      toast({ title: "تمت إضافة المنتج بنجاح!" });
      setOpenSheet(false);
      setProductFormData({ partition: "", partitionId: "" });
      setUploadedImages([]);
    });
  };
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Partitions</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="partition name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-2 focus:ring focus:ring-indigo-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border rounded-lg p-2 bg-gray-100"
          />
        </div>
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
          </div>
        )}
        <div className="mt-4">
          {editingId ? (
            <button
              onClick={handleUpdatePartition}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddPartition}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Add
            </button>
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Partition List </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partitions.map((partition) => (
          <div key={partition.id} className="bg-white shadow-lg rounded-lg p-4 relative">
            <img src={partition.image} alt={partition.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <h4 className="text-lg font-medium">{partition.name}</h4>
            <div className="flex justify-between mt-3">
              <button onClick={() => handleAddProduct(partition)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Add product
              </button>
              <button onClick={() => handleEditPartition(partition)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Edit
              </button>
              <button onClick={() => handleDeletePartition(partition.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle> Add new product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} imageLoadingState={false} setImageLoadingState={() => {}} />
          <div className="py-6">
            <CommonForm onSubmit={onSubmit} formData={productFormData} setFormData={setProductFormData} buttonText="إضافة" formControls={addProductFormElements} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminPartitions;
