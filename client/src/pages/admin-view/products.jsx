// import ProductImageUpload from "@/components/admin-view/image-upload";
// import AdminProductTile from "@/components/admin-view/product-tile";
// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useToast } from "@/components/ui/use-toast";
// import { addProductFormElements } from "@/config";
// import {
//   addNewProduct,
//   deleteProduct,
//   editProduct,
//   fetchAllProducts,
// } from "@/store/admin/products-slice";
// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const initialFormData = {
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
//   averageReview: 0,
//   color: "",
// };

// function AdminProducts() {
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
//     useState(false);
//   const [formData, setFormData] = useState(initialFormData);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [currentEditedId, setCurrentEditedId] = useState(null);

//   const { productList } = useSelector((state) => state.adminProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();

//     const productData = {
//       ...formData,
//       image: uploadedImages.join(","),
//     };

//     if (currentEditedId) {
//       dispatch(
//         editProduct({
//           id: currentEditedId,
//           formData: productData,
//         })
//       ).then(() => {
//         dispatch(fetchAllProducts());
//         setOpenCreateProductsDialog(false);
//       });
//     } else {
//       dispatch(addNewProduct(productData)).then(() => {
//         toast({ title: "Product added successfully!" });
//         setOpenCreateProductsDialog(false);
//         setFormData(initialFormData);
//         setUploadedImages([]);
//         dispatch(fetchAllProducts());
//       });
//     }
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   function handleDelete(getCurrentProductId) {
//     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts());
//       }
//     });
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .filter((currentKey) => currentKey !== "averageReview")
//       .map((key) => formData[key] !== "")
//       .every((item) => item);
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   return (
//     <Fragment>
//       <div className="mb-5 w-full flex justify-end">
//         <Button onClick={() => setOpenCreateProductsDialog(true)}>
//           Add New Product
//         </Button>
//       </div>
//       <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {productList && productList.length > 0
//           ? productList.map((productItem) => (
//               <AdminProductTile
//                 setFormData={setFormData}
//                 setOpenCreateProductsDialog={setOpenCreateProductsDialog}
//                 setCurrentEditedId={setCurrentEditedId}
//                 product={productItem}
//                 handleDelete={handleDelete}
//               />
//             ))
//           : null}
//       </div>
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={() => {
//           setOpenCreateProductsDialog(false);
//           setCurrentEditedId(null);
//           setFormData(initialFormData);
//         }}
//       >
//         <SheetContent side="right" className="overflow-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {currentEditedId !== null ? "Edit Product" : "Add New Product"}
//             </SheetTitle>
//           </SheetHeader>
//           <ProductImageUpload
//             uploadedImages={uploadedImages}
//             setUploadedImages={setUploadedImages}
//             imageLoadingState={false}
//             setImageLoadingState={() => {}}
//           />
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addProductFormElements}
//               isBtnDisabled={!isFormValid()}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminProducts;

// import ProductImageUpload from "@/components/admin-view/image-upload";
// import AdminProductTile from "@/components/admin-view/product-tile";
// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useToast } from "@/components/ui/use-toast";
// import { addProductFormElements } from "@/config";
// import {
//   addNewProduct,
//   deleteProduct,
//   editProduct,
//   fetchAllProducts,
// } from "@/store/admin/products-slice";
// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const initialFormData = {
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
//   averageReview: 0,
//   color: "",
// };

// function AdminProducts() {
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
//     useState(false);
//   const [formData, setFormData] = useState(initialFormData);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [currentEditedId, setCurrentEditedId] = useState(null);

//   const { productList } = useSelector((state) => state.adminProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();

//     const productData = {
//       ...formData,
//       image: uploadedImages.join(","),
//     };

//     if (currentEditedId) {
//       dispatch(
//         editProduct({
//           id: currentEditedId,
//           formData: productData,
//         })
//       ).then(() => {
//         dispatch(fetchAllProducts());
//         setOpenCreateProductsDialog(false);
//       });
//     } else {
//       dispatch(addNewProduct(productData)).then(() => {
//         toast({ title: "Product added successfully!" });
//         setOpenCreateProductsDialog(false);
//         setFormData(initialFormData);
//         setUploadedImages([]);
//         dispatch(fetchAllProducts());
//       });
//     }
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   function handleDelete(getCurrentProductId) {
//     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts());
//       }
//     });
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .filter((currentKey) => currentKey !== "averageReview")
//       .map((key) => formData[key] !== "")
//       .every((item) => item);
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   return (
//     <Fragment>
//       <div className="mb-5 w-full flex justify-end">
//         <Button onClick={() => setOpenCreateProductsDialog(true)}>
//           Add New Product
//         </Button>
//       </div>
//       <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {productList && productList.length > 0
//           ? productList.map((productItem) => (
//               <AdminProductTile
//                 setFormData={setFormData}
//                 setOpenCreateProductsDialog={setOpenCreateProductsDialog}
//                 setCurrentEditedId={setCurrentEditedId}
//                 product={productItem}
//                 handleDelete={handleDelete}
//               />
//             ))
//           : null}
//       </div>
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={() => {
//           setOpenCreateProductsDialog(false);
//           setCurrentEditedId(null);
//           setFormData(initialFormData);
//         }}
//       >
//         <SheetContent side="right" className="overflow-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {currentEditedId !== null ? "Edit Product" : "Add New Product"}
//             </SheetTitle>
//           </SheetHeader>
//           <ProductImageUpload
//             uploadedImages={uploadedImages}
//             setUploadedImages={setUploadedImages}
//             imageLoadingState={false}
//             setImageLoadingState={() => {}}
//           />
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addProductFormElements}
//               isBtnDisabled={!isFormValid()}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminProducts;

// import ProductImageUpload from "@/components/admin-view/image-upload";
// import AdminProductTile from "@/components/admin-view/product-tile";
// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useToast } from "@/components/ui/use-toast";
// import { addProductFormElements } from "@/config";
// import {
//   addNewProduct,
//   deleteProduct,
//   editProduct,
//   fetchAllProducts,
// } from "@/store/admin/products-slice";
// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const initialFormData = {
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
//   color: "",
//   size: "",
//   quantityPrices: [], // إضافة quantityPrices هنا
// };

// function AdminProducts() {
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
//     useState(false);
//   const [formData, setFormData] = useState(initialFormData);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [currentEditedId, setCurrentEditedId] = useState(null);

//   const { productList } = useSelector((state) => state.adminProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   // لتخزين وتحديث حالة التبديل لكل منتج بشكل منفصل
//   const [toggledStates, setToggledStates] = useState({});

//   // التحقق من حالة التبديل لكل منتج عند تحميل الصفحة
//   useEffect(() => {
//     if (currentEditedId !== null) {
//       const savedState = JSON.parse(localStorage.getItem(`showMessage-${currentEditedId}`));
//       setToggledStates((prev) => ({
//         ...prev,
//         [currentEditedId]: savedState ?? false, // تحميل الحالة بدون تعديلها
//       }));
//     }
//   }, [currentEditedId]);
  

//   const handleToggleChange = (productId) => {
//     setToggledStates((prevStates) => {
//       const newState = !prevStates[productId]; // عكس الحالة الحالية
//       localStorage.setItem(
//         `showMessage-${productId}`,
//         JSON.stringify(newState)
//       );
//       return { ...prevStates, [productId]: newState };
//     });
//   };

//   function onSubmit(event) {
//     event.preventDefault();

//     const productData = {
//       ...formData,
//       image: uploadedImages.join(","), // دمج الصور في سطر واحد
//     };

//     if (currentEditedId) {
//       dispatch(
//         editProduct({
//           id: currentEditedId,
//           formData: productData,
//         })
//       ).then(() => {
//         dispatch(fetchAllProducts());
//         setOpenCreateProductsDialog(false);
//       });
//     } else {
//       dispatch(addNewProduct(productData)).then(() => {
//         toast({ title: "Product added successfully!" });
//         setOpenCreateProductsDialog(false);
//         setFormData(initialFormData);
//         setUploadedImages([]);
//         dispatch(fetchAllProducts());
//       });
//     }
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   function handleDelete(getCurrentProductId) {
//     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts());
//       }
//     });
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .filter((currentKey) => currentKey !== "averageReview")
//       .map((key) => formData[key] !== "")
//       .every((item) => item); // تأكد من أن كل القيم مملوءة
//   }

//   return (
//     <Fragment>
//       <div className="mb-5 w-full flex justify-end">
//         <Button onClick={() => setOpenCreateProductsDialog(true)}>
//           Add New Product
//         </Button>
//       </div>
//       <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {productList && productList.length > 0
//           ? productList.map((productItem) => (
//               <AdminProductTile
//                 setFormData={setFormData}
//                 setOpenCreateProductsDialog={setOpenCreateProductsDialog}
//                 setCurrentEditedId={setCurrentEditedId}
//                 product={productItem}
//                 handleDelete={handleDelete}
//               />
//             ))
//           : null}
//       </div>
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={() => {
//           setOpenCreateProductsDialog(false);
//           setCurrentEditedId(null);
//           setFormData(initialFormData);
//         }}
//       >
//         <SheetContent side="right" className="overflow-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {currentEditedId !== null ? "Edit Product" : "Add New Product"}
//             </SheetTitle>
//           </SheetHeader>
//           <ProductImageUpload
//             uploadedImages={uploadedImages}
//             setUploadedImages={setUploadedImages}
//             imageLoadingState={false}
//             setImageLoadingState={() => {}}
//           />
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addProductFormElements}
//             />
//             {/* زر Turn On/Off داخل الـ CommonForm فقط في الحالة الأخيرة */}
//             {currentEditedId && (
//               <Button
//                 variant={
//                   !toggledStates[currentEditedId] ? "default" : "outline"
//                 } // عكس الحالة هنا
//                 onClick={() => handleToggleChange(currentEditedId)}
//                 className="mt-2"
//               >
//                 {!toggledStates[currentEditedId] ? "Turn Off" : "Turn On"}{" "}
//                 {/* عكس النص هنا */}
//               </Button>
//             )}
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminProducts;



import React, { Fragment, useEffect, useState } from "react";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  color: "",
  size: "",
  quantityPrices: [],
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  // state لتخزين حالة Turn On/Off لكل منتج أثناء التعديل
  const [toggledStates, setToggledStates] = useState({});

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // دالة لتحديث حالة التبديل (Turn On/Off)
  const handleToggleChange = (productId) => {
    setToggledStates((prevStates) => {
      const newState = !prevStates[productId];
      localStorage.setItem(`showMessage-${productId}`, JSON.stringify(newState));
      return { ...prevStates, [productId]: newState };
    });
  };

  // دالة لتحديث حالة isHidden (Hide/Unhide) والتي تُستخدم في بطاقة المنتج
  const toggleHide = (productId, newStatus) => {
    console.log("Toggling hide for product:", productId, "to", newStatus);
    dispatch(editProduct({ id: productId, formData: { isHidden: newStatus } }))
      .then((response) => {
        console.log("Response from editProduct:", response);
        dispatch(fetchAllProducts()).then((res) => {
          console.log("Updated product list:", res.payload);
        });
        toast({ title: `Product ${newStatus ? "hidden" : "unhidden"} successfully!` });
      })
      .catch((error) => {
        toast({ title: "Error updating product", variant: "destructive" });
        console.error("Error in toggleHide:", error);
      });
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  // دالة فتح نموذج التعديل
  const handleEdit = (product) => {
    setOpenCreateProductsDialog(true);
    setCurrentEditedId(product._id);
    setFormData(product);
    // يمكن تحميل حالة turn on/off إذا كانت محفوظة مسبقاً
    const savedState = JSON.parse(localStorage.getItem(`showMessage-${product._id}`));
    setToggledStates((prev) => ({ ...prev, [product._id]: savedState ?? false }));
  };

  function onSubmit(event) {
    event.preventDefault();
    const productData = {
      ...formData,
      image: uploadedImages.join(","),
    };

    if (currentEditedId) {
      dispatch(editProduct({ id: currentEditedId, formData: productData })).then(() => {
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
      });
    } else {
      dispatch(addNewProduct(productData)).then(() => {
        toast({ title: "Product added successfully!" });
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData);
        setUploadedImages([]);
        dispatch(fetchAllProducts());
      });
    }
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                key={product._id}
                product={product}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
                handleToggleHide={toggleHide}
                handleEdit={handleEdit}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            imageLoadingState={false}
            setImageLoadingState={() => {}}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
            />
            {/* زر Turn On/Off يظهر فقط عند التعديل */}
            {currentEditedId && (
              <Button
                variant={!toggledStates[currentEditedId] ? "default" : "outline"}
                onClick={() => handleToggleChange(currentEditedId)}
                className="mt-2"
              >
                {!toggledStates[currentEditedId] ? "Turn Off" : "Turn On"}
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
