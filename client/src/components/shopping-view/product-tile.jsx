// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddToCard,
// }) {
//   const imageToShow = product?.image ? product?.image.split(",")[0] : "";

//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div onClick={() => handleGetProductDetails(product?._id)}>
//         <div className="relative">
//           <img
//             src={imageToShow}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg "
//           />

//           {product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Sale
//             </Badge>
//           ) : null}
//         </div>
//         <CardContent className="p-4">
//           {/* <h2 className="text-xl font-bold mb-2">{product.title} </h2> */}
//           <div className="flex justify-between items-center mb-2">
           
//           <h2 className="text-xl font-bold mb-2">{product.title} </h2>

//             <span className="text-lg font-semibold text-primary">
//               6 socks
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-[16px] text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary `}
//             >
//               {product.price * 6} EGP
//             </span>
//             {product.salePrice > 0 ? (
//               <span className="text-lg font-semibold text-primary">
//                 {product.salePrice * 6} EGP
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>
//       <CardFooter>
       
//           <Button
//             onClick={() => handleAddToCard(product?._id, product?.totalStock)}
//             className="w-full"
//           >
//             Add to cart{" "}
//           </Button>
        
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;


import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate من React Router

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCard,
}) {
  const imageToShow = product?.image ? product?.image.split(",")[0] : "";
  const navigate = useNavigate(); // تفعيل التنقل باستخدام React Router

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // التحقق من حجم الشاشة عند تحميل الصفحة وعند تغيير الحجم
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProductClick = (productId) => {
    if (isMobile) {
      // التوجيه إلى صفحة MobileView عندما يكون العرض على موبايل
      navigate("/shop/mobile-view", { state: { productDetails: product } });
    } else {
      // عرض تفاصيل المنتج على الأجهزة غير الموبايل
      handleGetProductDetails(productId);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleProductClick(product?._id)}>
        <div className="relative">
          <img
            src={imageToShow}
            alt={product?.title}
            className={`w-full  object-cover rounded-t-lg ${isMobile ? 'h-[190px]' : 'h-[300px]' } `}
          />

          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <div className={`${isMobile ? ' ' : 'flex'} justify-between items-center mb-2`}>
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <span className="text-lg font-semibold text-primary">6 socks</span>
          </div>
          <div className={`flex justify-between ${isMobile ? ' ' : 'items-center'} mb-2`}
            style={{flexDirection: isMobile ? 'column' : ' '}}>
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {product.price * 6} EGP
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                {product.salePrice * 6} EGP
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddToCard(product?._id, product?.totalStock)}
          className="w-full"
        >
          Add to cart{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
