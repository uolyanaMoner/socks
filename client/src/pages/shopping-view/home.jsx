// import { Button } from "@/components/ui/button";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CloudLightning,
//   ShirtIcon,

// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";
// import Footer from "@/components/footer";
// import bg from "../../assets/bg.jpeg";

// const categoriesWithIcon = [
//   { id: "men", label: "Men", icon: ShirtIcon },
//   { id: "women", label: "Women", icon: CloudLightning },
//   // { id: "kids", label: "Kids", icon: BabyIcon },
// ];

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const [limit, setLimit] = useState(4);

//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const selectedCategories = [getCurrentItem.id];
//     if (getCurrentItem.id === "men" || getCurrentItem.id === "women") {
//       selectedCategories.push("unisex");
//     }

//     const currentFilter = {
//       [section]: selectedCategories,
//     };

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   // function handleAddToCard(getCurrentProductId) {
//   //   // استخراج userId من الـ user المسجل أو من localStorage إذا كان زائر
//   //   const userId = user?.id || localStorage.getItem('guestUserId');

//   //   // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
//   //   if (!userId) {
//   //     const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
//   //     localStorage.setItem('guestUserId', generatedUserId);  // حفظه في localStorage
//   //   }

//   //   // إرسال الطلب فقط إذا كان لدينا userId
//   //   if (userId) {
//   //     dispatch(
//   //       addToCart({
//   //         userId,
//   //         productId: getCurrentProductId,
//   //         quantity: 1,
//   //       })
//   //     ).then((data) => {
//   //       if (data?.payload?.success) {
//   //         dispatch(fetchCartItems(userId));  // تمرير userId بدلاً من user?.id
//   //         toast({
//   //           title: "Product is added to cart",
//   //         });
//   //       }
//   //     });
//   //   } else {
//   //     toast({
//   //       title: "Unable to get User ID",
//   //       variant: "destructive",
//   //     });
//   //   }
//   // }

// // تعديل handleAddToCard لإضافة توست في الأسفل عند استخدام موبايل

// function handleAddToCard(getCurrentProductId) {
//   const userId = user?.id || localStorage.getItem('guestUserId');

//   if (!userId) {
//     const generatedUserId = `guest-${Date.now()}`;
//     localStorage.setItem('guestUserId', generatedUserId);
//   }

//   if (userId) {
//     dispatch(
//       addToCart({
//         userId,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(userId));
//         toast({
//           title: "Product is added to cart",
//           style: {
//             position: "fixed",
//             left: "50%",
//             transform: "translateX(-50%)",
//             bottom:  "20px" , // أسفل الصفحة عند الموبايل
//           },
//         });
//       }
//     });
//   } else {
//     toast({
//       title: "Unable to get User ID",
//       variant: "destructive",
//       style: {
//         position: "fixed",
//         left: "50%",
//         transform: "translateX(-50%)",
//         bottom:  "20px" , // أسفل الصفحة عند الموبايل
//       },
//     });
//   }
// }

//   console.log(JSON.parse(localStorage.getItem("cart")));

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
//     }, 15000);

//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   console.log(productList, "productList");

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   return (
//     <div className="flex flex-col min-h-screen bg-center bg-no-repeat"
//     style={{
//       background:`url(${bg})`,
//     }} >
//       <div
//         className={`relative w-full overflow-hidden`}
//         style={{ height: isMobile ? `200px` : `500px` }}
//       >
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//               <img
//                 src={slide?.image}
//                 key={index}
//                 className={`${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//               />
//             ))
//           : null}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) =>
//                 (prevSlide - 1 + featureImageList.length) %
//                 featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronLeftIcon className="w-4 h-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronRightIcon className="w-4 h-4" />
//         </Button>
//       </div>
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Shop by category
//           </h2>
//           <div className="grid grid-cols-2 gap-6">
//             {categoriesWithIcon.map((categoryItem) => (
//               <Card
//                 onClick={() =>
//                   handleNavigateToListingPage(categoryItem, "category")
//                 }
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center  justify-center p-6">
//                   <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{categoryItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Feature Products
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <ShoppingProductTile
//                     handleGetProductDetails={handleGetProductDetails}
//                     product={productItem}
//                     handleAddToCard={handleAddToCard}
//                   />
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//       <div className="container bg-black text-white">
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default ShoppingHome;

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CloudLightning,
//   ShirtIcon,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";
// import Footer from "@/components/footer";
// import Snowfall from "react-snowfall"; // مكتبة الثلج
// import bg from "../../assets/bg.jpeg";

// const categoriesWithIcon = [
//   { id: "men", label: "Men", icon: ShirtIcon },
//   { id: "women", label: "Women", icon: CloudLightning },
// ];

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const [limit, setLimit] = useState(4);

//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const selectedCategories = [getCurrentItem.id];
//     if (getCurrentItem.id === "men" || getCurrentItem.id === "women") {
//       selectedCategories.push("unisex");
//     }

//     const currentFilter = {
//       [section]: selectedCategories,
//     };

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddToCard(getCurrentProductId) {
//     const userId = user?.id || localStorage.getItem("guestUserId");

//     if (!userId) {
//       const generatedUserId = `guest-${Date.now()}`;
//       localStorage.setItem("guestUserId", generatedUserId);
//     }

//     if (userId) {
//       dispatch(
//         addToCart({
//           userId,
//           productId: getCurrentProductId,
//           quantity: 1,
//         })
//       ).then((data) => {
//         if (data?.payload?.success) {
//           dispatch(fetchCartItems(userId));
//           toast({
//             title: "Product is added to cart",
//             style: {
//               position: "fixed",
//               left: "50%",
//               transform: "translateX(-50%)",
//               bottom: "20px",
//             },
//           });
//         }
//       });
//     } else {
//       toast({
//         title: "Unable to get User ID",
//         variant: "destructive",
//         style: {
//           position: "fixed",
//           left: "50%",
//           transform: "translateX(-50%)",
//           bottom: "20px",
//         },
//       });
//     }
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
//     }, 15000);

//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   return (
//     <div
//       className="flex flex-col min-h-screen bg-center bg-no-repeat"
//       style={{
//         background: `url(${bg})`,
//       }}
//     >
//       {/* تأثير الثلج */}
//       <Snowfall
//         color="white"
//         snowflakeCount={100}
//         style={{
//           position: "fixed",
//           width: "100vw",
//           height: "100vh",
//           zIndex: 9999, // أعلى قيمة zIndex
//           pointerEvents: "none", // يمنع الثلج من التأثير على تفاعل المستخدم مع الصفحة
//         }}
//       />

//       <div
//         className={`relative w-full overflow-hidden`}
//         style={{ height: isMobile ? `200px` : `500px` }}
//       >
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//               <img
//                 src={slide?.image}
//                 key={index}
//                 className={`${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//               />
//             ))
//           : null}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) =>
//                 (prevSlide - 1 + featureImageList.length) %
//                 featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronLeftIcon className="w-4 h-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronRightIcon className="w-4 h-4" />
//         </Button>
//       </div>
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Shop by category
//           </h2>
//           <div className="grid grid-cols-2 gap-6">
//             {categoriesWithIcon.map((categoryItem) => (
//               <Card
//                 onClick={() =>
//                   handleNavigateToListingPage(categoryItem, "category")
//                 }
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center  justify-center p-6">
//                   <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{categoryItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Feature Products
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <ShoppingProductTile
//                     handleGetProductDetails={handleGetProductDetails}
//                     product={productItem}
//                     handleAddToCard={handleAddToCard}
//                   />
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//       <div className="container bg-black text-white">
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default ShoppingHome;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import Footer from "@/components/footer";
import Snowfall from "react-snowfall";
import bg from "../../assets/bg.jpeg";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const selectedCategories = [getCurrentItem.id];
    if (getCurrentItem.id === "men" || getCurrentItem.id === "women") {
      selectedCategories.push("unisex");
    }
    const currentFilter = { [section]: selectedCategories };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCard(getCurrentProductId) {
    const userId = user?.id || localStorage.getItem("guestUserId");
    if (!userId) {
      const generatedUserId = `guest-${Date.now()}`;
      localStorage.setItem("guestUserId", generatedUserId);
    }
    if (userId) {
      dispatch(addToCart({ userId, productId: getCurrentProductId, quantity: 1 })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(userId));
          toast({
            title: "Product is added to cart",
            style: {
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "20px",
            },
          });
        }
      });
    } else {
      toast({
        title: "Unable to get User ID",
        variant: "destructive",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "20px",
        },
      });
    }
  }

  // فلترة المنتجات بحيث تُعرض المنتجات غير المخفية فقط
  const visibleProducts = productList ? productList.filter(p => !p.isHidden) : [];
  console.log("Visible products:", visibleProducts);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-no-repeat"
      style={{ background: `url(${bg})` }}
    >
      <Snowfall
        color="white"
        snowflakeCount={100}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <div
        className={`relative w-full overflow-hidden`}
        style={{ height: isMobile ? `200px` : `500px` }}
      >
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts && visibleProducts.length > 0
              ? visibleProducts.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCard={handleAddToCard}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <div className="container bg-black text-white">
        <Footer />
      </div>
    </div>
  );
}

export default ShoppingHome;
