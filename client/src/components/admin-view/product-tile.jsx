// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";

// function AdminProductTile({
//   product,
//   setFormData,
//   setOpenCreateProductsDialog,
//   setCurrentEditedId,
//   handleDelete,
// }) {
//   const imageToShow = product?.image ? product?.image.split(",")[0] : "";

//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div>
//         <div className="relative">
//           <img
//             src={imageToShow}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               {`only ${product?.totalStock} items left`}
//             </Badge>
//           ) : null}
//         </div>
//         <CardContent>
//           <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               {product?.price} EGP
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-bold">
//                 {product?.salePrice} EGP{" "}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between items-center">
//           <Button
//             onClick={() => {
//               setOpenCreateProductsDialog(true);
//               setCurrentEditedId(product?._id);
//               setFormData(product);
//             }}
//           >
//             Edit
//           </Button>
//           <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
//         </CardFooter>
//       </div>
//     </Card>
//   );
// }

// export default AdminProductTile;

// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import Slider from "react-slick"; // استيراد مكتبة السلايدر

// function AdminProductTile({
//   product,
//   setFormData,
//   setOpenCreateProductsDialog,
//   setCurrentEditedId,
//   handleDelete,
//   handleToggleHide,
// }) {
//   // تقسيم الصور إلى مصفوفة إذا كانت موجودة
//   const images = product?.image ? product?.image.split(",") : [];

//   // استخدم القيمة الافتراضية false لو كانت undefined
//   const isHidden = product.isHidden || false;

//   // إعدادات السلايدر
//   const settings = {
//     dots: true, // إظهار النقاط للتنقل بين الصور
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true, // تشغيل تلقائي للسلايدر
//     autoplaySpeed: 3000, // سرعة التبديل بين الصور
//   };

//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div>
//         <div className="relative">
//           {images.length > 1 ? (
//             // إذا كانت هناك أكثر من صورة، عرض سلايدر
//             <Slider {...settings}>
//               {images.map((image, index) => (
//                 <div key={index}>
//                   <img
//                     src={image}
//                     alt={product?.title}
//                     className="w-full h-[300px] object-cover rounded-t-lg"
//                   />
//                 </div>
//               ))}
//             </Slider>
//           ) : (
//             // إذا كانت صورة واحدة فقط، عرض الصورة
//             <img
//               src={images[0]}
//               alt={product?.title}
//               className="w-full h-[300px] object-cover rounded-t-lg"
//             />
//           )}

//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               {`only ${product?.totalStock} items left`}
//             </Badge>
//           ) : null}
//         </div>
//         <CardContent>
//           <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               {product?.price} EGP
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-bold">
//                 {product?.salePrice} EGP{" "}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between items-center">
//           <Button
//             onClick={() => {
//               setOpenCreateProductsDialog(true);
//               setCurrentEditedId(product?._id);
//               setFormData(product);
//             }}
//           >
//             Edit
//           </Button>
//           <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
//           <div>
//             <Button
//               onClick={() => {
//                 console.log("Before toggle, product isHidden:", isHidden);
//                 handleToggleHide(product?._id, !isHidden);
//               }}
//             >
//               {isHidden ? "Unhide" : "Hide"}
//             </Button>
//           </div>
//         </CardFooter>
//       </div>
//     </Card>
//   );
// }

// export default AdminProductTile;

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Slider from "react-slick";
import { useRef } from "react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
  handleToggleHide,
  handleEdit,
}) {
  const images = product?.image ? product.image.split(",") : [];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };
  const sliderRef = useRef(null);
  const handleMouseEnter = () => sliderRef.current?.slickPlay();
  const handleMouseLeave = () => sliderRef.current?.slickPause();

  // استخدمي القيمة الافتراضية false لو كانت undefined
  const isHidden = product.isHidden || false;

  return (
    <Card className="w-full max-w-sm mx-auto relative">
      {/* نضع الـ overlay في الحاوية العليا فقط */}
      <div className="relative">
        {isHidden && (
          <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
            <span className="text-white font-bold text-lg">Hidden</span>
          </div>
        )}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {images.length > 1 ? (
            <Slider ref={sliderRef} {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={images[0]}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          )}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500">{`only ${product?.totalStock} items left`}</Badge>
          ) : null}
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.price} EGP
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold">
                {product?.salePrice} EGP
              </span>
            )}
          </div>
        </CardContent>
      </div>
      {/* CardFooter مع z-index أعلى ليبقى فوق الـ overlay */}
      <CardFooter className="relative z-20 flex justify-between items-center">
        <div className="flex space-x-2 mt-2">
          <Button onClick={() => handleEdit(product)}>Edit</Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
          <Button
            onClick={() => {
              console.log("Before toggle, product isHidden:", isHidden);
              handleToggleHide(product?._id, !isHidden);
            }}
          >
            {isHidden ? "Unhide" : "Hide"}
          </Button>
        </div>
        <div></div>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
