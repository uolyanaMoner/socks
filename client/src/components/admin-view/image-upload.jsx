// import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useEffect, useRef } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { Skeleton } from "../ui/skeleton";

// function ProductImageUpload({
//   imageFile,
//   setImageFile,
//   imageLoadingState,
//   uploadedImageUrl,
//   setUploadedImageUrl,
//   setImageLoadingState,
//   isEditMode,
//   isCustomStyling = false,
// }) {
//   const inputRef = useRef(null);

//   console.log(isEditMode, "isEditMode");

//   function handleImageFileChange(event) {
//     console.log(event.target.files, "event.target.files");
//     const selectedFile = event.target.files?.[0];
//     console.log(selectedFile);

//     if (selectedFile) setImageFile(selectedFile);
//   }

//   function handleDragOver(event) {
//     event.preventDefault();
//   }

//   function handleDrop(event) {
//     event.preventDefault();
//     const droppedFile = event.dataTransfer.files?.[0];
//     if (droppedFile) setImageFile(droppedFile);
//   }

//   function handleRemoveImage() {
//     setImageFile(null);
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   }

//   async function uploadImageToCloudinary() {
//     setImageLoadingState(true);
//     const data = new FormData();
//     data.append("my_file", imageFile)
//     const response = await axios.post(
//       "http://localhost:5000/api/admin/products/upload-image",
//       data
//     );
//     console.log(response, "response");

//     if (response?.data?.success) {
//       setUploadedImageUrl(response.data.result.url);
//       setImageLoadingState(false);
//     }
//   }

//   useEffect(() => {
//     if (imageFile !== null) uploadImageToCloudinary();
//   }, [imageFile]);

//   return (
//     <div
//       className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
//     >
//       <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
//       <div
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
// className={`${
//   isEditMode ? "opacity-60" : ""
// } border-2 border-dashed rounded-lg p-4`}
//       >
//         <Input
//           id="image-upload"
//           type="file"
//           className="hidden"
//           ref={inputRef}
//           multiple
//           onChange={handleImageFileChange}
//           disabled={isEditMode}
//         />
//         {!imageFile ? (
//           <Label
//             htmlFor="image-upload"
//             className={`${
//               isEditMode ? "cursor-not-allowed" : ""
//             } flex flex-col items-center justify-center h-32 cursor-pointer`}
//           >
//             <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
//             <span>Drag & drop or click to upload image</span>
//           </Label>
//         ) : imageLoadingState ? (
//           <Skeleton className="h-10 bg-gray-100" />
//         ) : (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <FileIcon className="w-8 text-primary mr-2 h-8" />
//             </div>
//             <p className="text-sm font-medium">{imageFile.name}</p>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-muted-foreground hover:text-foreground"
//               onClick={handleRemoveImage}
//             >
//               <XIcon className="w-4 h-4" />
//               <span className="sr-only">Remove File</span>
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductImageUpload;

// import { UploadCloudIcon, XIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useRef, useState } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";

// function ProductImageUpload({
//   uploadedImages,
//   setUploadedImages,
//   imageLoadingState,
//   setImageLoadingState,
//   isCustomStyling = false,
// }) {
//   const inputRef = useRef(null);

//   async function handleFileChange(event) {
//     const selectedFiles = Array.from(event.target.files);
//     if (selectedFiles.length) {
//       setImageLoadingState(true);

//       try {
//         const uploadPromises = selectedFiles.map((file) => {
//           const formData = new FormData();
//           formData.append("file", file);
//           formData.append("upload_preset", "ml_default");

//           return axios.post(
//             "https://api.cloudinary.com/v1_1/dud2xcn2l/image/upload",
//             formData
//           ).then((response) => response.data.secure_url);
//         });

//         const uploadedUrls = await Promise.all(uploadPromises);
//         setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);
//       } catch (error) {
//         console.error("Error uploading images:", error);
//       } finally {
//         setImageLoadingState(false);
//       }
//     }
//   }

//   function handleRemoveImage(url) {
//     setUploadedImages((prev) => prev.filter((image) => image !== url));
//   }

//   return (
//     <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
//       <Label className="text-lg font-semibold mb-2 block">Upload Images</Label>
//       <div className={`border-2 border-dashed rounded-lg p-4`}>
//         <Input
//           id="image-upload"
//           type="file"
//           className="hidden"
//           ref={inputRef}
//           onChange={handleFileChange}
//           multiple
//         />
//         <Label
//           htmlFor="image-upload"
//           className="flex flex-col items-center justify-center h-32 cursor-pointer"
//         >
//           <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
//           <span>Click to upload images</span>
//         </Label>
//         {imageLoadingState && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
//         <div className="grid grid-cols-3 gap-2 mt-4">
//           {uploadedImages?.map((url, index) => (
//             <div key={index} className="relative">
//               <img src={url} alt="Uploaded" className="h-20 w-20 object-cover rounded-lg" />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-0 right-0 text-muted-foreground hover:text-foreground"
//                 onClick={() => handleRemoveImage(url)}
//               >
//                 <XIcon className="w-4 h-4" />
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductImageUpload;

// import {
//   UploadCloudIcon,
//   XIcon,
//   ArrowUpIcon,
//   ArrowDownIcon,
// } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useRef } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";

// function ProductImageUpload({
//   uploadedImages,
//   setUploadedImages,
//   imageLoadingState,
//   setImageLoadingState,
//   isCustomStyling = false,
// }) {
//   const inputRef = useRef(null);

//   async function handleFileChange(event) {
//     const selectedFiles = Array.from(event.target.files);
//     if (selectedFiles.length) {
//       setImageLoadingState(true);

//       try {
//         const uploadPromises = selectedFiles.map((file) => {
//           const formData = new FormData();
//           formData.append("file", file);
//           formData.append("upload_preset", "ml_default");

//           return axios
//             .post(
//               "https://api.cloudinary.com/v1_1/dud2xcn2l/image/upload",
//               formData
//             )
//             .then((response) => response.data.secure_url);
//         });

//         const uploadedUrls = await Promise.all(uploadPromises);
//         setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);
//       } catch (error) {
//         console.error("Error uploading images:", error);
//       } finally {
//         setImageLoadingState(false);
//       }
//     }
//   }

//   function handleRemoveImage(url) {
//     setUploadedImages((prev) => prev.filter((image) => image !== url));
//   }

//   function moveImage(index, direction) {
//     const newImages = [...uploadedImages];
//     const targetIndex = index + direction;

//     if (targetIndex >= 0 && targetIndex < newImages.length) {
//       [newImages[index], newImages[targetIndex]] = [
//         newImages[targetIndex],
//         newImages[index],
//       ];
//       setUploadedImages(newImages);
//     }
//   }

//   return (
//     <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
//       <Label className="text-lg font-semibold mb-2 block">Upload Images</Label>
//       <div className={`border-2 border-dashed rounded-lg p-4`}>
//         <Input
//           id="image-upload"
//           type="file"
//           className="hidden"
//           ref={inputRef}
//           onChange={handleFileChange}
//           multiple
//         />
//         <Label
//           htmlFor="image-upload"
//           className="flex flex-col items-center justify-center h-32 cursor-pointer"
//         >
//           <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
//           <span>Click to upload images</span>
//         </Label>
//         {imageLoadingState && (
//           <p className="text-sm text-gray-500 mt-2">Uploading...</p>
//         )}
//         <div className="grid grid-cols-3 gap-2 mt-4">
//           {uploadedImages?.map((url, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={url}
//                 alt="Uploaded"
//                 className="h-20 w-20 object-cover rounded-lg"
//               />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-0 right-0 text-muted-foreground hover:text-foreground"
//                 onClick={() => handleRemoveImage(url)}
//               >
//                 <XIcon className="w-4 h-4" />
//               </Button>
//               <div className="absolute bottom-0 left-0 flex gap-1">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => moveImage(index, -1)} // Move up
//                   disabled={index === 0} // Disable if it's the first image
//                 >
//                   <ArrowUpIcon className="w-4 h-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => moveImage(index, 1)} // Move down
//                   disabled={index === uploadedImages.length - 1} // Disable if it's the last image
//                 >
//                   <ArrowDownIcon className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductImageUpload;


import {
  UploadCloudIcon,
  XIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({
  uploadedImages,
  setUploadedImages,
  imageLoadingState,
  setImageLoadingState,
  isCustomStyling = false,
  setImages, // إضاقة setImages لتحديث الصور في السليدر
}) {
  const inputRef = useRef(null);

  async function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length) {
      setImageLoadingState(true);

      try {
        const uploadPromises = selectedFiles.map((file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "ml_default");

          return axios
            .post(
              "https://api.cloudinary.com/v1_1/dnuws63di/image/upload",
              formData
            )
            .then((response) => response.data.secure_url);
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);

        // إضافة الصور إلى السليدر مع ترتيب الصورة الأولى
        setImages([uploadedUrls[0], ...uploadedUrls.slice(1)]);
      } catch (error) {
        console.error("Error uploading images:", error);
      } finally {
        setImageLoadingState(false);
      }
    }
  }

  function handleRemoveImage(url) {
    setUploadedImages((prev) => prev.filter((image) => image !== url));
    setImages((prev) => prev.filter((image) => image !== url)); // تحديث السليدر عند الحذف
  }

  function moveImage(index, direction) {
    const newImages = [...uploadedImages];
    const targetIndex = index + direction;

    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [
        newImages[targetIndex],
        newImages[index],
      ];
      setUploadedImages(newImages);
      setImages(newImages); // تحديث السليدر
    }
  }

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Images</Label>
      <div className={`border-2 border-dashed rounded-lg p-4`}>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          multiple
        />
        <Label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center h-32 cursor-pointer"
        >
          <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
          <span>Click to upload images</span>
        </Label>
        {imageLoadingState && (
          <p className="text-sm text-gray-500 mt-2">Uploading...</p>
        )}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {uploadedImages?.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt="Uploaded"
                className="h-20 w-20 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveImage(url)}
              >
                <XIcon className="w-4 h-4" />
              </Button>
              <div className="absolute bottom-0 left-0 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveImage(index, -1)} // Move up
                  disabled={index === 0} // Disable if it's the first image
                >
                  <ArrowUpIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveImage(index, 1)} // Move down
                  disabled={index === uploadedImages.length - 1} // Disable if it's the last image
                >
                  <ArrowDownIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductImageUpload;
