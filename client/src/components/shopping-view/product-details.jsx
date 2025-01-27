// import { StarIcon } from "lucide-react";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Separator } from "../ui/separator";
// import { Input } from "../ui/input";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import StarRatingComponent from "../common/star-rating";
// import { useEffect, useState } from "react";
// import { addReview, getReviews } from "@/store/shop/review-slice";
// function ProductDetailsDialog({ open, setOpen, productDetails,  }) {
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);;
//   const [quantity, setQuantity] = useState(1);

//   const { toast } = useToast();

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   function handleRatingChange(getRating) {
//     console.log(getRating, "getRating");

//     setRating(getRating);
//   }

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     if (quantity > getTotalStock) {
//       toast({
//         title: `Only ${getTotalStock} items available in stock`,
//         variant: "destructive",
//       });
//       return;
//     }

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//     setRating(0);
//     setReviewMsg("");
//   }

//   function handleAddReview() {
//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewMessage: reviewMsg,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0);
//         setReviewMsg("");
//         dispatch(getReviews(productDetails?._id));
//         toast({
//           title: "Review added successfully!",
//         });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id));
//   }, [productDetails]);

//   console.log(reviews, "reviews");

//   const averageReview =
//     reviews && reviews.length > 0
//       ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//         reviews.length
//       : 0;

//       const totalCost =
//       (productDetails?.salePrice > 0
//         ? productDetails?.salePrice
//         : productDetails?.price) *
//         quantity ;

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 lg:max-h-[780px]  max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
//         <div className="relative overflow-hidden rounded-lg">
//           <img
//             src={productDetails?.image}
//             alt={productDetails?.title}
//             width={600}
//             height={600}
//             className="aspect-square w-full object-cover"
//           />
//         </div>
//         <div className="">
//           <div>
//             <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
//             <p className="text-muted-foreground text-2xl mb-3 mt-4">
//               {productDetails?.description}
//             </p>
//           </div>
//           <div className="flex items-center justify-between">
//             <p
//               className={`text-3xl font-bold text-primary ${
//                 productDetails?.salePrice > 0 ? "line-through" : ""
//               }`}
//             >
//               {productDetails?.salePrice === 0 ? (
//                 <p> {totalCost} EGP</p>
//               ) : (
//                 <p> {productDetails?.price} EGP</p>
//               )}
//             </p>
//             {productDetails?.salePrice > 0 ? (
//               <p className="text-2xl font-bold text-muted-foreground">
//                 {totalCost} EGP
//               </p>
//             ) : null}
//           </div>
//           <div className="mt-1">
//             <Label>Quantity</Label>
//             <select
//               value={quantity}
//               onChange={handleQuantityChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="1">1</option>
//               <option value="6">6</option>
//               <option value="12">12</option>
//             </select>
//           </div>
//           <div className="flex items-center gap-2 mt-2">
//             <div className="flex items-center gap-0.5">
//               <StarRatingComponent rating={averageReview} />
//             </div>
//             <span className="text-muted-foreground">
//               ({averageReview.toFixed(2)})
//             </span>
//           </div>
//           <div className="mt-4 mb-4">
//             {productDetails?.totalStock === 0 ? (
//               <Button className="w-full opacity-60 cursor-not-allowed">
//                 Out of Stock
//               </Button>
//             ) : (
//               <Button
//                 className="w-full"
//                 onClick={() =>
//                   handleAddToCart(
//                     productDetails?._id,
//                     productDetails?.totalStock
//                   )
//                 }
//               >
//                 Add to Cart
//               </Button>
//             )}
//           </div>
//           <Separator />
//           <div className="max-h-[300px] overflow-auto">
//             <h2 className="text-xl font-bold mb-4">Reviews</h2>
//             <div className="grid gap-6">
//               {reviews && reviews.length > 0 ? (
//                 reviews.map((reviewItem) => (
//                   <div className="flex gap-4">
//                     <Avatar className="w-10 h-10 border">
//                       <AvatarFallback>
//                         {reviewItem?.userName[0].toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="grid gap-1">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-bold">{reviewItem?.userName}</h3>
//                       </div>
//                       <div className="flex items-center gap-0.5">
//                         <StarRatingComponent rating={reviewItem?.reviewValue} />
//                       </div>
//                       <p className="text-muted-foreground">
//                         {reviewItem.reviewMessage}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <h1>No Reviews</h1>
//               )}
//             </div>
//             <div className="mt-10 p-2 flex-col flex gap-2">
//               <Label>Write a review</Label>
//               <div className="flex gap-1">
//                 <StarRatingComponent
//                   rating={rating}
//                   handleRatingChange={handleRatingChange}
//                 />
//               </div>
//               <Input
//                 name="reviewMsg"
//                 value={reviewMsg}
//                 onChange={(event) => setReviewMsg(event.target.value)}
//                 placeholder="Write a review..."
//               />
//               <Button
//                 onClick={handleAddReview}
//                 disabled={reviewMsg.trim() === ""}
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;

// import { StarIcon } from "lucide-react";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Separator } from "../ui/separator";
// import { Input } from "../ui/input";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import StarRatingComponent from "../common/star-rating";
// import { useEffect, useState } from "react";
// import { addReview, getReviews } from "@/store/shop/review-slice";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);
//   const [quantity, setQuantity] = useState(1);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const { toast } = useToast();

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   function handleRatingChange(getRating) {
//     console.log(getRating, "getRating");

//     setRating(getRating);
//   }

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     if (quantity > getTotalStock) {
//       toast({
//         title: `Only ${getTotalStock} items available in stock`,
//         variant: "destructive",
//       });
//       return;
//     }

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//     setRating(0);
//     setReviewMsg("");
//   }

//   function handleAddReview() {
//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewMessage: reviewMsg,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0);
//         setReviewMsg("");
//         dispatch(getReviews(productDetails?._id));
//         toast({
//           title: "Review added successfully!",
//         });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id));
//   }, [productDetails]);

//   console.log(reviews, "reviews");

//   const averageReview =
//     reviews && reviews.length > 0
//       ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//         reviews.length
//       : 0;

//   const totalCost =
//     (productDetails?.salePrice > 0
//       ? productDetails?.salePrice
//       : productDetails?.price) * quantity;

//       const images = productDetails?.image ? productDetails?.image.split(",") : [];

//       const sliderSettings = {
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         arrows: true,
//         dots: true,
//       };

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 lg:max-h-[780px] max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
//       <div className="relative overflow-hidden rounded-lg">
//           {images.length > 1 ? (
//             <Slider {...sliderSettings}>
//               {images.map((img, index) => (
//                 <div key={index} className="w-full h-[400px]">
//                   <img
//                     src={img}
//                     alt={`product-${index}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               ))}
//             </Slider>
//           ) : (
//             images.length === 1 && (
//               <img
//                 src={images[0]}
//                 alt={productDetails?.title}
//                 className="aspect-square w-full h-[400px] object-cover rounded-lg"
//               />
//             )
//           )}
//         </div>
//         <div className="">
//           <div>
//             <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
//             <p className="text-muted-foreground text-2xl mb-3 mt-4">
//               {productDetails?.description}
//             </p>
//           </div>
//           <div className="flex items-center justify-between">
//             <p
//               className={`text-3xl font-bold text-primary ${
//                 productDetails?.salePrice > 0 ? "line-through" : ""
//               }`}
//             >
//               {productDetails?.salePrice === 0 ? (
//                 <p> {totalCost} EGP</p>
//               ) : (
//                 <p> {productDetails?.price} EGP</p>
//               )}
//             </p>
//             {productDetails?.salePrice > 0 ? (
//               <p className="text-2xl font-bold text-muted-foreground">
//                 {totalCost} EGP
//               </p>
//             ) : null}
//           </div>
//           <div className="mt-1">
//             <Label>Quantity</Label>
//             <select
//               value={quantity}
//               onChange={handleQuantityChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="1">1</option>
//               <option value="6">6</option>
//               <option value="12">12</option>
//             </select>
//           </div>
//           <div className="flex items-center gap-2 mt-2">
//             <div className="flex items-center gap-0.5">
//               <StarRatingComponent rating={averageReview} />
//             </div>
//             <span className="text-muted-foreground">
//               ({averageReview.toFixed(2)})
//             </span>
//           </div>
//           <div className="mt-4 mb-4">
//             {productDetails?.totalStock === 0 ? (
//               <Button className="w-full opacity-60 cursor-not-allowed">
//                 Out of Stock
//               </Button>
//             ) : (
//               <Button
//                 className="w-full"
//                 onClick={() =>
//                   handleAddToCart(
//                     productDetails?._id,
//                     productDetails?.totalStock
//                   )
//                 }
//               >
//                 Add to Cart
//               </Button>
//             )}
//           </div>
//           <Separator />
//           <div className="max-h-[300px] overflow-auto">
//             <h2 className="text-xl font-bold mb-4">Reviews</h2>
//             <div className="grid gap-6">
//               {reviews && reviews.length > 0 ? (
//                 reviews.map((reviewItem) => (
//                   <div className="flex gap-4">
//                     <Avatar className="w-10 h-10 border">
//                       <AvatarFallback>
//                         {reviewItem?.userName[0].toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="grid gap-1">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-bold">{reviewItem?.userName}</h3>
//                       </div>
//                       <div className="flex items-center gap-0.5">
//                         <StarRatingComponent rating={reviewItem?.reviewValue} />
//                       </div>
//                       <p className="text-muted-foreground">
//                         {reviewItem.reviewMessage}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <h1>No Reviews</h1>
//               )}
//             </div>
//             <div className="mt-10 p-2 flex-col flex gap-2">
//               <Label>Write a review</Label>
//               <div className="flex gap-1">
//                 <StarRatingComponent
//                   rating={rating}
//                   handleRatingChange={handleRatingChange}
//                 />
//               </div>
//               <Input
//                 name="reviewMsg"
//                 value={reviewMsg}
//                 onChange={(event) => setReviewMsg(event.target.value)}
//                 placeholder="Write a review..."
//               />
//               <Button
//                 onClick={handleAddReview}
//                 disabled={reviewMsg.trim() === ""}
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;

import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(""); // تعريف المتغير هنا
  const [additionalDetails, setAdditionalDetails] = useState(""); // حالة لتخزين نص المستخدم
  const { productList } = useSelector((state) => state.shopProducts);
  const [isExpanded, setIsExpanded] = useState(false); // حالة لعرض أو إخفاء الوصف الكامل
  const [isLaptop, setIsLaptop] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
  };

  const handleAdditionalDetailsChange = (event) => {
    setAdditionalDetails(event.target.value); // تحديث النص عند الكتابة
  };

  useEffect(() => {
    console.log(productDetails?.color, "productDetails?.color");

    const colors = Array.isArray(productDetails?.color)
      ? productDetails?.color
      : productDetails?.color
      ? productDetails?.color.split(" and ")
      : [];

    console.log(colors, "availableColors");
    setAvailableColors(colors);

    if (colors.length) {
      setSelectedColor(colors[0]);
    }
  }, [productDetails?.color]);

  // function handleAddToCart(getCurrentProductId, getTotalStock) {
  //   // if (quantity > getTotalStock) {
  //   //   toast({
  //   //     title: `Only ${getTotalStock} items available in stock`,
  //   //     variant: "destructive",
  //   //   });
  //   //   return;
  //   // }

  //   // تحقق من اللون والكمية لإرسال التفاصيل
  //   const userId = user?.id || localStorage.getItem("guestUserId");

  //   // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
  //   if (!userId) {
  //     const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
  //     localStorage.setItem("guestUserId", generatedUserId); // حفظه في localStorage
  //   }

  //   const shouldSubmitDetails =
  //     (selectedColor === "black&white" || selectedColor === "white&black") &&
  //     (quantity === 5 || quantity === 10);
  //   if (userId) {
  //     dispatch(
  //       addToCart({
  //         userId,
  //         productId: getCurrentProductId,
  //         quantity,
  //         color: selectedColor || "",
  //         additionalDetails: shouldSubmitDetails ? additionalDetails : "",
  //       })
  //     ).then((data) => {
  //       if (data?.payload?.success) {
  //         dispatch(fetchCartItems(userId)); // تمرير userId بدلاً من user?.id
  //         toast({
  //           title: "Product is added to cart",
  //         });
  //       }
  //     });
  //   } else {
  //     toast({
  //       title: "Unable to get User ID",
  //       variant: "destructive",
  //     });
  //   }
  // }

  const shareProduct = async () => {
    const productUrl = window.location.href; // الحصول على رابط المنتج الحالي

    // تحقق من دعم المتصفح لميزة الشير
    if (navigator.share) {
      try {
        await navigator.share({
          title: productDetails?.title,
          text: productDetails?.description,
          url: productUrl, // رابط المنتج
        });
        console.log("Product shared successfully!");
      } catch (error) {
        console.log("Error sharing product:", error);
      }
    } else {
      // إذا كان المتصفح لا يدعم الـ share API
      alert("Share feature is not supported in your browser.");
    }
  };

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const userId = user?.id || localStorage.getItem("guestUserId");

    if (!userId) {
      const generatedUserId = `guest-${Date.now()}`;
      localStorage.setItem("guestUserId", generatedUserId);
    }

    let selectedPrice = getDiscountedPrice(quantity); // Use the price based on quantity selection

    const cartItem = {
      userId,
      productId: getCurrentProductId,
      quantity,
      price: selectedPrice, // Store the selected price for the quantity
      color: selectedColor || "defaultColor",
      additionalDetails: additionalDetails,
    };
    console.log("cartItem", cartItem);
    // Dispatch action to add the product to cart
    dispatch(addToCart(cartItem)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(userId));
        toast({
          title: "Product is added to cart",
          style: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom:  "20px" , // أسفل الصفحة عند الموبايل
          },
        });
      }
    });
  }

  // function handleDialogClose() {
  //   setOpen(false);
  //   dispatch(setProductDetails());
  //   setRating(0);
  //   setReviewMsg("");
  // }

  // function handleAddReview() {
  //   dispatch(
  //     addReview({
  //       productId: productDetails?._id,
  //       userId: user?.id,
  //       userName: user?.userName,
  //       reviewMessage: reviewMsg,
  //       reviewValue: rating,
  //     })
  //   ).then((data) => {
  //     if (data.payload.success) {
  //       setRating(0);
  //       setReviewMsg("");
  //       dispatch(getReviews(productDetails?._id));
  //       toast({
  //         title: "Review added successfully!",
  //       });
  //     }
  //   });
  // }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const totalCost =
    (productDetails?.salePrice > 0
      ? productDetails?.salePrice
      : productDetails?.price) * quantity;

  const images = productDetails?.image ? productDetails?.image.split(",") : [];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const getDiscountedPrice = (quantity) => {
    // هنا بتختار السعر بناءً على الكمية من quantityPrices
    const price = productDetails?.quantityPrices?.find(
      (item) => item.quantity === quantity
    )?.price;

    return price || productDetails?.price; // لو مفيش سعر محدد للكمية هيرجع السعر الأصلي
  };

  const getDescription = () => {
    if (!productDetails?.description) return "";
    if (isExpanded) {
      return productDetails?.description; // الوصف بالكامل عند التوسيع
    } else {
      // سيتم إرجاع الوصف فقط لأهم 3 أسطر
      const descriptionLines = productDetails?.description?.split("\n");
      return descriptionLines?.slice(0, 3).join("\n"); // 3 أسطر فقط
    }
  };

  useEffect(() => {
    // Check if the device is a laptop based on screen width
    const checkDeviceType = () => {
      setIsLaptop(window.innerWidth > 1024); // افترض أن اللاب يبدأ من عرض أكبر من 1024 بكسل
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails()); // Reset product details
    setRating(0);
    setReviewMsg("");
  };

  // Only show the dialog if it's a laptop and there are product details
  if (!isLaptop || !productDetails) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 lg:max-h-[780px] max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          {images.length > 1 ? (
            <Slider {...sliderSettings} style={{ overflow: "hidden" }}>
              {images.map((img, index) => (
                <div key={index} style={{ borderRadius: "8px" }}>
                  <img
                    src={img}
                    alt={`product-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={images[0]}
              alt={productDetails?.title}
              className="aspect-square w-full h-[400px] object-cover rounded-lg"
            />
          )}
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p
              className="text-muted-foreground text-[16px] text-left mb-3 mt-4"
              style={{
                maxHeight: isExpanded ? "none" : "4.5em", // عرض الوصف بالكامل عند التوسيع
                overflow: "hidden", // إخفاء ما يزيد عن الأسطر المحددة
                display: "-webkit-box", // استخدام box لعرض الأسطر بشكل مرتب
                WebkitBoxOrient: "vertical", // لضمان العرض العمودي
                WebkitLineClamp: isExpanded ? "none" : 3, // 3 أسطر فقط عند التقلص
              }}
            >
              {getDescription()}
            </p>

            {/* زر لعرض الوصف بالكامل أو تقليصه */}
            {productDetails?.description?.split("\n").length > 3 && (
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="link"
                style={{
                  padding: 0,
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 && quantity === 1
                  ? "line-through"
                  : ""
              }`}
            >
              {productDetails?.salePrice === 0 || quantity > 1 ? (
                <span>{getDiscountedPrice(quantity)} EGP</span>
              ) : (
                <span>{productDetails?.price} EGP</span>
              )}
            </p>
            {productDetails?.salePrice > 0 && quantity === 1 && (
              <p className="text-2xl font-bold text-muted-foreground">
                {productDetails?.salePrice} EGP
              </p>
            )}
          </div>
          <div>
            <label htmlFor="color" className="block font-bold">
              Choose Color:
            </label>
            {availableColors.length > 0 ? (
              <select
                id="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="border rounded p-2 w-full"
              >
                {availableColors.map((color, index) => (
                  <option key={index} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">No colors available</p>
            )}
          </div>
          <div className="mt-1">
            <Label>Quantity</Label>
            <select
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {/* إضافة خيار الكمية 1 كخيار ثابت */}
              <option value={1}>1</option>

              {productDetails?.quantityPrices?.map((item, index) => (
                <option key={index} value={item.quantity}>
                  {item.quantity}
                </option>
              ))}
            </select>
          </div>
          {/* Text area for additional input */}
          {(selectedColor === "black&white" ||
            selectedColor === "white&black") &&
            quantity > 1 && (
              <div className="mt-4">
                <label htmlFor="additionalInput" className="block font-bold">
                  Additional Details:
                </label>
                <textarea
                  id="additionalInput"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Please specify details here..."
                  value={additionalDetails}
                  onChange={handleAdditionalDetailsChange}
                />
              </div>
            )}

          {/* <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div> */}
          <div className="mt-4 mb-4">
            <Button
              className="w-full"
              onClick={() =>
                handleAddToCart(productDetails?._id, productDetails?.totalStock)
              }
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          {/* <div>
            {/* <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      {/* <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p> */}
            {/* </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 p-2 flex-col flex gap-2">
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              {/* <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              /> */}
            {/* <Button onClick={handleAddReview}>Submit</Button>
            </div>
          </div>   */}
          {/* </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const [quantity, setQuantity] = useState(1);
//   const [availableColors, setAvailableColors] = useState([]);
//   const [selectedColor, setSelectedColor] = useState(""); // Define the color state
//   const [additionalDetails, setAdditionalDetails] = useState(""); // State for additional text
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { toast } = useToast();

//   // Function to determine the discounted price based on the quantity
//   const getDiscountedPrice = (quantity) => {
//     const price = productDetails?.quantityPrices?.find(
//       (item) => item.quantity === quantity
//     )?.price;
//     return price || productDetails?.price; // Return the price for the selected quantity
//   };

//   useEffect(() => {
//     const colors = Array.isArray(productDetails?.color)
//       ? productDetails?.color
//       : productDetails?.color
//       ? productDetails?.color.split(" and ")
//       : [];
//     setAvailableColors(colors);
//     if (colors.length) {
//       setSelectedColor(colors[0]);
//     }
//   }, [productDetails?.color]);

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   const handleColorChange = (event) => {
//     const newColor = event.target.value;
//     setSelectedColor(newColor);
//   };

//   const handleAdditionalDetailsChange = (event) => {
//     setAdditionalDetails(event.target.value); // Update the additional details text
//   };

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     const userId = user?.id || localStorage.getItem("guestUserId");

//     if (!userId) {
//       const generatedUserId = `guest-${Date.now()}`;
//       localStorage.setItem("guestUserId", generatedUserId);
//     }

//     let selectedPrice = getDiscountedPrice(quantity); // Use the price based on quantity selection

//     const cartItem = {
//       userId,
//       productId: getCurrentProductId,
//       quantity,
//       price: selectedPrice, // Store the selected price for the quantity
//       color: selectedColor || 'defaultColor',
//       additionalDetails: additionalDetails,
//     };
// console.log('cartItem', cartItem)
//     // Dispatch action to add the product to cart
//     dispatch(addToCart(cartItem)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(userId));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   return (
//     <Dialog open={open} onOpenChange={() => setOpen(false)}>
//       <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 lg:max-h-[780px] max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
//         <div className="relative overflow-hidden rounded-lg">
//           {/* Product Image */}
//           <img
//             src={productDetails?.image}
//             alt={productDetails?.title}
//             className="aspect-square w-full h-[400px] object-cover rounded-lg"
//           />
//         </div>
//         <div className="">
//           {/* Product Details */}
//           <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
//           <p className="text-muted-foreground text-2xl mb-3 mt-4">
//             {productDetails?.description}
//           </p>

//           <div className="flex items-center justify-between">
//             <p className="text-3xl font-bold text-primary">
//               {getDiscountedPrice(quantity)} EGP
//             </p>
//           </div>

//           {/* Color Selection */}
//           <div>
//             <label htmlFor="color" className="block font-bold">
//               Choose Color:
//             </label>
//             {availableColors.length > 0 ? (
//               <select
//                 id="color"
//                 value={selectedColor}
//                 onChange={handleColorChange}
//                 className="border rounded p-2 w-full"
//               >
//                 {availableColors.map((color, index) => (
//                   <option key={index} value={color}>
//                     {color.charAt(0).toUpperCase() + color.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <p className="text-red-500">No colors available</p>
//             )}
//           </div>

//           {/* Quantity Selection */}
//           <div className="mt-1">
//             <Label>Quantity</Label>
//             <select
//               value={quantity}
//               onChange={handleQuantityChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value={1}>1</option>
//               {productDetails?.quantityPrices?.map((item, index) => (
//                 <option key={index} value={item.quantity}>
//                   {item.quantity}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Add to Cart Button */}
//           <div className="flex items-center justify-between mt-4">
//             <Button
//               onClick={() =>
//                 handleAddToCart(productDetails?._id, productDetails?.totalStock)
//               }
//             >
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;
