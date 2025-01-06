// import { useLocation } from "react-router-dom";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import StarRatingComponent from "../common/star-rating";
// import { useState, useEffect } from "react";
// import Slider from "react-slick"; // إضافة الكاروسيل
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // إضافة الفانكشن من الريدوكس
// import { toast, useToast } from "../ui/use-toast";
// import { addReview, getReviews } from "@/store/shop/review-slice";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";

// function MobileView() {
//   const { state } = useLocation(); // استلام البيانات المرسلة عبر التوجيه
//   const productDetails = state?.productDetails; // استخراج بيانات المنتج
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);
//   const [quantity, setQuantity] = useState(1);
//   const { toast } = useToast();
//   const [availableColors, setAvailableColors] = useState([]);
//   const [selectedColor, setSelectedColor] = useState(""); // تعريف المتغير هنا
//   const [additionalDetails, setAdditionalDetails] = useState(""); // حالة لتخزين نص المستخدم

//   useEffect(() => {
//     if (productDetails?.color) {
//       const colors = Array.isArray(productDetails?.color)
//         ? productDetails?.color
//         : productDetails?.color
//         ? productDetails?.color.split(" and ")
//         : [];
//       setAvailableColors(colors);
//       if (colors.length) {
//         setSelectedColor(colors[0]);
//       }
//     }
//   }, [productDetails?.color]);

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   const handleColorChange = (event) => {
//     setSelectedColor(event.target.value);
//   };

//   const handleAdditionalDetailsChange = (event) => {
//     setAdditionalDetails(event.target.value);
//   };

//   function handleRatingChange(getRating) {
//     console.log(getRating, "getRating");

//     setRating(getRating);
//   }

//   // إعدادات الكاروسيل
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     // if (quantity > getTotalStock) {
//     //   toast({
//     //     title: `Only ${getTotalStock} items available in stock`,
//     //     variant: "destructive",
//     //   });
//     //   return;
//     // }

//     // تحقق من اللون والكمية لإرسال التفاصيل
//     const userId = user?.id || localStorage.getItem("guestUserId");

//     // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
//     if (!userId) {
//       const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
//       localStorage.setItem("guestUserId", generatedUserId); // حفظه في localStorage
//     }

//     const shouldSubmitDetails =
//       (selectedColor === "black&white" || selectedColor === "white&black") &&
//       (quantity === 5 || quantity === 10);
//     if (userId) {
//       dispatch(
//         addToCart({
//           userId,
//           productId: getCurrentProductId,
//           quantity,
//           color: selectedColor || "",
//           additionalDetails: shouldSubmitDetails ? additionalDetails : "",
//         })
//       ).then((data) => {
//         if (data?.payload?.success) {
//           dispatch(fetchCartItems(userId)); // تمرير userId بدلاً من user?.id
//           toast({
//             title: "Product is added to cart",
//           });
//         }
//       });
//     } else {
//       toast({
//         title: "Unable to get User ID",
//         variant: "destructive",
//       });
//     }
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
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0);
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

//   const images = productDetails?.image ? productDetails?.image.split(",") : [];

//   return (
//     <div className="p-4">
//       <div className="relative overflow-hidden rounded-lg">
//         {images.length > 1 ? (
//           <Slider {...sliderSettings} style={{ overflow: "hidden" }}>
//             {images.map((img, index) => (
//               <div key={index} style={{ borderRadius: "8px" }}>
//                 <img
//                   src={img}
//                   alt={`product-${index}`}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </div>
//             ))}
//           </Slider>
//         ) : (
//           <img
//             src={images[0]}
//             alt={productDetails?.title}
//             className="aspect-square w-full h-[400px] object-cover rounded-lg"
//           />
//         )}
//       </div>
//       <div className="">
//         <div>
//           <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
//           <p className="text-muted-foreground text-2xl mb-3 mt-4">
//             {productDetails?.description}
//           </p>
//         </div>
//         <div className="flex items-center justify-between">
//           <p
//             className={`text-3xl font-bold text-primary ${
//               productDetails?.salePrice > 0 ? "line-through" : ""
//             }`}
//           >
//             {productDetails?.salePrice === 0 ? (
//               <p> {totalCost} EGP</p>
//             ) : (
//               <p> {productDetails?.price} EGP</p>
//             )}
//           </p>
//           {productDetails?.salePrice > 0 ? (
//             <p className="text-2xl font-bold text-muted-foreground">
//               {totalCost} EGP
//             </p>
//           ) : null}
//         </div>
//         <div>
//           <label htmlFor="color" className="block font-bold">
//             Choose Color:
//           </label>
//           {availableColors.length > 0 ? (
//             <select
//               id="color"
//               value={selectedColor}
//               onChange={handleColorChange}
//               className="border rounded p-2 w-full"
//             >
//               {availableColors.map((color, index) => (
//                 <option key={index} value={color}>
//                   {color.charAt(0).toUpperCase() + color.slice(1)}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <p className="text-red-500">No colors available</p>
//           )}
//         </div>
//         <div className="mt-1">
//           <Label>Quantity</Label>
//           <select
//             value={quantity}
//             onChange={handleQuantityChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             <option value="1">1</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//           </select>
//         </div>
//         {/* Text area for additional input */}
//         {(selectedColor === "black&white" || selectedColor === "white&black") &&
//           (quantity === 5 || quantity === 10) && (
//             <div className="mt-4">
//               <label htmlFor="additionalInput" className="block font-bold">
//                 Additional Details:
//               </label>
//               <textarea
//                 id="additionalInput"
//                 className="w-full p-2 border border-gray-300 rounded"
//                 placeholder="Please specify details here..."
//                 value={additionalDetails}
//                 onChange={handleAdditionalDetailsChange}
//               />
//             </div>
//           )}

//         <div className="flex items-center gap-2 mt-2">
//           <div className="flex items-center gap-0.5">
//             <StarRatingComponent rating={averageReview} />
//           </div>
//           <span className="text-muted-foreground">
//             ({averageReview.toFixed(2)})
//           </span>
//         </div>
//         <div className="mt-4 mb-4">
//           <Button
//             className="w-full"
//             onClick={() =>
//               handleAddToCart(productDetails?._id, productDetails?.totalStock)
//             }
//           >
//             Add to Cart
//           </Button>
//         </div>
//         <Separator />
//         <div className="max-h-[300px] overflow-auto">
//           <h2 className="text-xl font-bold mb-4">Reviews</h2>
//           <div className="grid gap-6">
//             {reviews && reviews.length > 0 ? (
//               reviews.map((reviewItem) => (
//                 <div className="flex gap-4">
//                   <Avatar className="w-10 h-10 border">
//                     <AvatarFallback>
//                       {reviewItem?.userName[0].toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="grid gap-1">
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-bold">{reviewItem?.userName}</h3>
//                     </div>
//                     <div className="flex items-center gap-0.5">
//                       <StarRatingComponent rating={reviewItem?.reviewValue} />
//                     </div>
//                     {/* <p className="text-muted-foreground">
//                         {reviewItem.reviewMessage}
//                       </p> */}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <h1>No Reviews</h1>
//             )}
//           </div>
//           <div className="mt-10 p-2 flex-col flex gap-2">
//             <div className="flex gap-1">
//               <StarRatingComponent
//                 rating={rating}
//                 handleRatingChange={handleRatingChange}
//               />
//             </div>
//             {/* <Input
//                 name="reviewMsg"
//                 value={reviewMsg}
//                 onChange={(event) => setReviewMsg(event.target.value)}
//                 placeholder="Write a review..."
//               /> */}
//             <Button onClick={handleAddReview}>Submit</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MobileView;

// import { useLocation } from "react-router-dom";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import StarRatingComponent from "../common/star-rating";
// import { useState, useEffect } from "react";
// import Slider from "react-slick"; // إضافة الكاروسيل
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // إضافة الفانكشن من الريدوكس
// import { toast, useToast } from "../ui/use-toast";
// import { addReview, getReviews } from "@/store/shop/review-slice";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";

// function MobileView() {
//   const { state } = useLocation(); // استلام البيانات المرسلة عبر التوجيه
//   const productDetails = state?.productDetails; // استخراج بيانات المنتج
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);
//   const [quantity, setQuantity] = useState(1);
//   const { toast } = useToast();
//   const [availableColors, setAvailableColors] = useState([]);
//   const [selectedColor, setSelectedColor] = useState(""); // تعريف المتغير هنا
//   const [additionalDetails, setAdditionalDetails] = useState(""); // حالة لتخزين نص المستخدم
//   const [selectedImage, setSelectedImage] = useState(""); // لتخزين الصورة المحددة

//   useEffect(() => {
//     if (productDetails?.color) {
//       const colors = Array.isArray(productDetails?.color)
//         ? productDetails?.color
//         : productDetails?.color
//         ? productDetails?.color.split(" and ")
//         : [];
//       setAvailableColors(colors);
//       if (colors.length) {
//         setSelectedColor(colors[0]);
//       }
//     }
//   }, [productDetails?.color]);

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   const handleColorChange = (event) => {
//     setSelectedColor(event.target.value);
//   };

//   const handleAdditionalDetailsChange = (event) => {
//     setAdditionalDetails(event.target.value);
//   };

//   function handleRatingChange(getRating) {
//     console.log(getRating, "getRating");

//     setRating(getRating);
//   }

//   // إعدادات الكاروسيل
//   const sliderSettings = {
//     dots: true,
//     infinite: true, // إيقاف التكرار
//     speed: 500,
//     slidesToShow: 3, // عرض 3 صور في نفس الوقت
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     centerMode: true, // تفعيل الوضع المركزي
//     focusOnSelect: true, // تحديد الصورة عند النقر عليها
//     centerPadding: "10px", // تقليل المسافة بين الصور
//     rtl: false, // تعطيل الاتجاه من اليمين لليسار
//   };

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     // تحقق من اللون والكمية لإرسال التفاصيل
//     const userId = user?.id || localStorage.getItem("guestUserId");

//     // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
//     if (!userId) {
//       const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
//       localStorage.setItem("guestUserId", generatedUserId); // حفظه في localStorage
//     }

//     const shouldSubmitDetails =
//       (selectedColor === "black&white" || selectedColor === "white&black") &&
//       (quantity === 5 || quantity === 10);
//     if (userId) {
//       dispatch(
//         addToCart({
//           userId,
//           productId: getCurrentProductId,
//           quantity,
//           color: selectedColor || "",
//           additionalDetails: shouldSubmitDetails ? additionalDetails : "",
//         })
//       ).then((data) => {
//         if (data?.payload?.success) {
//           dispatch(fetchCartItems(userId)); // تمرير userId بدلاً من user?.id
//           toast({
//             title: "Product is added to cart",
//           });
//         }
//       });
//     } else {
//       toast({
//         title: "Unable to get User ID",
//         variant: "destructive",
//       });
//     }
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//     setRating(0);
//     setReviewMsg("");
//   }

// function handleAddReview() {
//   dispatch(
//     addReview({
//       productId: productDetails?._id,
//       userId: user?.id,
//       userName: user?.userName,
//       reviewValue: rating,
//     })
//   ).then((data) => {
//     if (data.payload.success) {
//       setRating(0);
//       dispatch(getReviews(productDetails?._id));
//       toast({
//         title: "Review added successfully!",
//       });
//     }
//   });
// }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id));
//   }, [productDetails]);

//   console.log(reviews, "reviews");

// const averageReview =
//   reviews && reviews.length > 0
//     ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
//     : 0;

//   const totalCost =
//     (productDetails?.salePrice > 0
//       ? productDetails?.salePrice
//       : productDetails?.price) * quantity;

//   const images = productDetails?.image ? productDetails?.image.split(",") : [];

//   return (
//     <div className="p-4 pt-0"> {/* إزالة الفراغ العلوي هنا */}
//       <div className="relative overflow-hidden rounded-lg">
//         {images.length > 1 ? (
//           <div className="relative">
//             <img
//               src={selectedImage || images[0]} // إذا لم يتم تحديد صورة يتم عرض الصورة الأولى
//               alt={productDetails?.title}
//               className="aspect-square w-full h-[400px] object-cover rounded-lg mb-4"
//             />
//             <Slider
//               {...sliderSettings}
//               style={{ overflow: "hidden" }}
//               className="slider-container"
//             >
//               {images.map((img, index) => (
//                 <div key={index} className="slider-image">
//                   <img
//                     src={img}
//                     alt={`product-${index}`}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       maxWidth: "90px", // تصغير الحجم
//                       maxHeight: "90px", // تصغير الحجم
//                       margin: "0 5px", // تقليل المسافة بين الصور
//                     }}
//                     onClick={() => setSelectedImage(img)} // تغيير الصورة عند النقر
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         ) : (
//           <img
//             src={images[0]}
//             alt={productDetails?.title}
//             className="aspect-square w-full h-[400px] object-cover rounded-lg"
//           />
//         )}
//       </div>
//       <div className="">
//         <div>
//           <h1 className="text-3xl font-extrabold mt-3 text-center">{productDetails?.title}</h1>
//           <p className="text-muted-foreground text-2xl mb-3 mt-4">
//             {productDetails?.description}
//           </p>
//         </div>
//         <div className="flex items-center mt-3 mb-3 justify-between">
//           <p
//             className={`text-3xl font-bold text-primary ${
//               productDetails?.salePrice > 0 ? "line-through" : ""
//             }`}
//           >
//             {productDetails?.salePrice === 0 ? (
//               <p> {totalCost} EGP</p>
//             ) : (
//               <p> {productDetails?.price} EGP</p>
//             )}
//           </p>
//           {productDetails?.salePrice > 0 ? (
//             <p className="text-2xl font-bold text-muted-foreground">
//               {totalCost} EGP
//             </p>
//           ) : null}
//         </div>
//         <div>
//           <label htmlFor="color" className="block font-bold">
//             Choose Color:
//           </label>
//           {availableColors.length > 0 ? (
//             <select
//               id="color"
//               value={selectedColor}
//               onChange={handleColorChange}
//               className="border rounded p-2 w-full"
//             >
//               {availableColors.map((color, index) => (
//                 <option key={index} value={color}>
//                   {color.charAt(0).toUpperCase() + color.slice(1)}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <p className="text-red-500">No colors available</p>
//           )}
//         </div>
//         <div className="mt-1">
//           <Label>Quantity</Label>
//           <select
//             value={quantity}
//             onChange={handleQuantityChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             <option value="1">1</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//           </select>
//         </div>
//         {/* Text area for additional input */}
//         {(selectedColor === "black&white" || selectedColor === "white&black") &&
//           (quantity === 5 || quantity === 10) && (
//             <div className="mt-4">
//               <label htmlFor="additionalInput" className="block font-bold">
//                 Additional Details:
//               </label>
//               <textarea
//                 id="additionalInput"
//                 className="w-full p-2 border border-gray-300 rounded"
//                 placeholder="Please specify details here..."
//                 value={additionalDetails}
//                 onChange={handleAdditionalDetailsChange}
//               />
//             </div>
//           )}

//         <div className="flex items-center gap-2 mt-2">
//           <div className="flex items-center gap-0.5">
//             <StarRatingComponent rating={averageReview} />
//           </div>
//           <span className="text-muted-foreground">
//             ({averageReview.toFixed(2)})
//           </span>
//         </div>
//         <div className="mt-4 mb-4">
//           <Button
//             className="w-full"
//             onClick={() =>
//               handleAddToCart(productDetails?._id, productDetails?.totalStock)
//             }
//           >
//             Add to Cart
//           </Button>
//         </div>
//         <Separator />
//         <div className="max-h-[300px] overflow-auto">
//           <h2 className="text-xl font-bold mb-4">Reviews</h2>
//           <div className="grid gap-6">
//             {reviews && reviews.length > 0 ? (
//               reviews.map((reviewItem) => (
//                 <div className="flex gap-4">
//                   <Avatar className="w-10 h-10 border">
//                     <AvatarFallback>
//                       {reviewItem?.userName[0].toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="grid gap-1">
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-bold">{reviewItem?.userName}</h3>
//                     </div>
//                     <div className="flex items-center gap-0.5">
//                       <StarRatingComponent rating={reviewItem?.reviewValue} />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <h1>No Reviews</h1>
//             )}
//           </div>
//           <div className="mt-10 p-2 flex-col flex gap-2">
//             <div className="flex gap-1">
//               <StarRatingComponent
//                 rating={rating}
//                 handleRatingChange={handleRatingChange}
//               />
//             </div>
//             <Button onClick={handleAddReview}>Submit</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default MobileView;

// import { useLocation } from "react-router-dom";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import StarRatingComponent from "../common/star-rating";
// import { useState, useEffect } from "react";
// import Slider from "react-slick"; // إضافة الكاروسيل
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // إضافة الفانكشن من الريدوكس
// import { toast, useToast } from "../ui/use-toast";
// import { addReview, getReviews } from "@/store/shop/review-slice";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";

// function MobileView() {
//   const { state } = useLocation(); // استلام البيانات المرسلة عبر التوجيه
//   const productDetails = state?.productDetails; // استخراج بيانات المنتج
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);
//   const [quantity, setQuantity] = useState(1); // السكليت يبدأ من 1
//   const { toast } = useToast();
//   const [availableColors, setAvailableColors] = useState([]);
//   const [selectedColor, setSelectedColor] = useState(""); // تعريف المتغير هنا
//   const [additionalDetails, setAdditionalDetails] = useState(""); // حالة لتخزين نص المستخدم
//   const [selectedImage, setSelectedImage] = useState(""); // لتخزين الصورة المحددة

//   useEffect(() => {
//     if (productDetails?.color) {
//       const colors = Array.isArray(productDetails?.color)
//         ? productDetails?.color
//         : productDetails?.color
//         ? productDetails?.color.split(" and ")
//         : [];
//       setAvailableColors(colors);
//       if (colors.length) {
//         setSelectedColor(colors[0]);
//       }
//     }
//   }, [productDetails?.color]);

//   const handleQuantityChange = (event) => {
//     const selectedQuantity = parseInt(event.target.value);
//     setQuantity(selectedQuantity);
//   };

//   const handleColorChange = (event) => {
//     setSelectedColor(event.target.value);
//   };

//   const handleAdditionalDetailsChange = (event) => {
//     setAdditionalDetails(event.target.value);
//   };

//   function handleRatingChange(getRating) {
//     setRating(getRating);
//   }

//   function handleAddReview() {
//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0);
//         dispatch(getReviews(productDetails?._id));
//         toast({
//           title: "Review added successfully!",
//         });
//       }
//     });
//   }

//   // إعدادات الكاروسيل
//   const sliderSettings = {
//     dots: true,
//     infinite: true, // إيقاف التكرار
//     speed: 500,
//     slidesToShow: 3, // عرض 3 صور في نفس الوقت
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     centerMode: true, // تفعيل الوضع المركزي
//     focusOnSelect: true, // تحديد الصورة عند النقر عليها
//     centerPadding: "10px", // تقليل المسافة بين الصور
//     rtl: false, // تعطيل الاتجاه من اليمين لليسار
//   };

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     const userId = user?.id || localStorage.getItem("guestUserId");

//     if (!userId) {
//       const generatedUserId = `guest-${Date.now()}`;
//       localStorage.setItem("guestUserId", generatedUserId);
//     }

//     const discountedPrice = getDiscountedPrice(quantity);

//     dispatch(
//       addToCart({
//         userId,
//         productId: getCurrentProductId,
//         quantity,
//         color: selectedColor || "",
//         additionalDetails:
//           selectedColor === "black&white" || selectedColor === "white&black"
//             ? additionalDetails
//             : "",
//         price: discountedPrice, // إرسال السعر الصحيح للـ cart
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(userId));
//         toast({
//           title: "Product added to card",
//         });
//       }
//     });
//   }

//   // دالة لحساب السعر بناءً على الكمية
//   const getDiscountedPrice = (quantity) => {
//     // هنا بتختار السعر بناءً على الكمية من quantityPrices
//     const price = productDetails?.quantityPrices?.find(
//       (item) => item.quantity === quantity
//     )?.price;

//     return price || productDetails?.price; // لو مفيش سعر محدد للكمية هيرجع السعر الأصلي
//   };

//   // حساب التكلفة الكلية
//   const totalCost = getDiscountedPrice(quantity);

//   const images = productDetails?.image ? productDetails?.image.split(",") : [];

//   return (
//     <div className="p-4 pt-0">
//       <div className="relative overflow-hidden rounded-lg">
//         {images.length > 1 ? (
//           <div className="relative">
//             <img
//               src={selectedImage || images[0]} // إذا لم يتم تحديد صورة يتم عرض الصورة الأولى
//               alt={productDetails?.title}
//               className="aspect-square w-full h-[400px] object-cover rounded-lg mb-4"
//             />
//             <Slider
//               {...sliderSettings}
//               style={{ overflow: "hidden" }}
//               className="slider-container"
//             >
//               {images.map((img, index) => (
//                 <div key={index} className="slider-image">
//                   <img
//                     src={img}
//                     alt={`product-${index}`}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       maxWidth: "90px", // تصغير الحجم
//                       maxHeight: "90px", // تصغير الحجم
//                       margin: "0 5px", // تقليل المسافة بين الصور
//                     }}
//                     onClick={() => setSelectedImage(img)} // تغيير الصورة عند النقر
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         ) : (
//           <img
//             src={images[0]}
//             alt={productDetails?.title}
//             className="aspect-square w-full h-[400px] object-cover rounded-lg"
//           />
//         )}
//       </div>
//       <div className="">
//         <div>
//           <h1 className="text-3xl font-extrabold mt-3 text-center">
//             {productDetails?.title}
//           </h1>
//           <p className="text-muted-foreground text-2xl mb-3 mt-4">
//             {productDetails?.description}
//           </p>
//         </div>
//         <div className="flex items-center justify-between">
//           <p
//             className={`text-3xl font-bold text-primary ${
//               productDetails?.salePrice > 0 && quantity === 1
//                 ? "line-through"
//                 : ""
//             }`}
//           >
//             {productDetails?.salePrice === 0 || quantity > 1 ? (
//               <span>{getDiscountedPrice(quantity)} EGP</span>
//             ) : (
//               <span>{productDetails?.price} EGP</span>
//             )}
//           </p>
//           {productDetails?.salePrice > 0 && quantity === 1 && (
//             <p className="text-2xl font-bold text-muted-foreground">
//               {productDetails?.salePrice} EGP
//             </p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="color" className="block font-bold">
//             Choose color
//           </label>
//           {availableColors.length > 0 && (
//             <select
//               id="color"
//               value={selectedColor}
//               onChange={handleColorChange}
//               className="border rounded p-2 w-full"
//             >
//               {availableColors.map((color, index) => (
//                 <option key={index} value={color}>
//                   {color.charAt(0).toUpperCase() + color.slice(1)}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>
//         <div className="mt-1">
//           <Label>Quantity</Label>
//           <select
//             value={quantity}
//             onChange={handleQuantityChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             {/* إضافة خيار الكمية 1 كخيار ثابت */}
//             <option value={1}>1</option>

//             {productDetails?.quantityPrices?.map((item, index) => (
//               <option key={index} value={item.quantity}>
//                 {item.quantity}
//               </option>
//             ))}
//           </select>
//         </div>

//         {(selectedColor === "black&white" || selectedColor === "white&black") &&
//           (quantity === 5 || quantity === 10) && (
//             <div className="mt-4">
//               <label htmlFor="additionalInput" className="block font-bold">
//                 Additional Details
//               </label>
//               <textarea
//                 id="additionalInput"
//                 className="w-full p-2 border border-gray-300 rounded"
//                 placeholder="يرجى تحديد التفاصيل هنا..."
//                 value={additionalDetails}
//                 onChange={handleAdditionalDetailsChange}
//               />
//             </div>
//           )}

//         <div className="flex items-center gap-2 mt-2">
//           <div className="flex items-center gap-0.5">
//             <StarRatingComponent rating={rating} />
//           </div>
//           <span className="text-muted-foreground">({rating.toFixed(2)})</span>
//         </div>
//         <div className="mt-4 mb-4">
//           <Button
//             className="w-full"
//             onClick={() =>
//               handleAddToCart(productDetails?._id, productDetails?.totalStock)
//             }
//           >
//             Add to card
//           </Button>
//         </div>
//         <Separator />
//         <div className="max-h-[300px] overflow-auto">
//           <h2 className="text-xl font-bold mb-4">Reviews</h2>
//           <div className="grid gap-6">
//             {reviews && reviews.length > 0 ? (
//               reviews.map((reviewItem) => (
//                 <div className="flex gap-4">
//                   <Avatar className="w-10 h-10 border">
//                     <AvatarFallback>
//                       {reviewItem?.userName[0].toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="grid gap-1">
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-bold">{reviewItem?.userName}</h3>
//                     </div>
//                     <div className="flex items-center gap-0.5">
//                       <StarRatingComponent rating={reviewItem?.reviewValue} />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <h1>No reviews</h1>
//             )}
//           </div>
//           <div className="mt-10 p-2 flex-col flex gap-2">
//             <div className="flex gap-1">
//               <StarRatingComponent
//                 rating={rating}
//                 handleRatingChange={handleRatingChange}
//               />
//             </div>
//             <Button onClick={handleAddReview}>Submit</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MobileView;

import { useLocation, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import StarRatingComponent from "../common/star-rating";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick"; // إضافة الكاروسيل
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // إضافة الفانكشن من الريدوكس
import { toast, useToast } from "../ui/use-toast";
import { addReview, getReviews } from "@/store/shop/review-slice";
import {
  fetchProductDetails,
  setProductDetails,
} from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Share2 } from "lucide-react";

function MobileView() {
  const { state } = useLocation(); // استلام البيانات المرسلة عبر التوجيه
  // const productDetails = state?.productDetails; // استخراج بيانات المنتج
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [quantity, setQuantity] = useState(1); // السكليت يبدأ من 1
  const { toast } = useToast();
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(""); // تعريف المتغير هنا
  const [additionalDetails, setAdditionalDetails] = useState(""); // حالة لتخزين نص المستخدم
  const [selectedImage, setSelectedImage] = useState(""); // لتخزين الصورة المحددة
  const { productId } = useParams(); // الحصول على معرّف المنتج من الرابط
  const [isExpanded, setIsExpanded] = useState(false); // حالة لعرض أو إخفاء الوصف الكامل
  const productDetails = useSelector(
    (state) => state.shopProducts.productDetails
  ); // جلب بيانات المنتج من Redux
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب تفاصيل المنتج عبر الـ ID
    dispatch(fetchProductDetails(productId)).then(() => setLoading(false));
  }, [productId, dispatch]);

  // دالة الشير
  const shareProduct = async () => {
    const productUrl = window.location.href; // الحصول على رابط المنتج الحالي

    // تحقق من دعم المتصفح لميزة الشير
    if (navigator.share) {
      try {
        await navigator.share({
          title: productDetails?.title,
          text: "check it out now!",
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

  useEffect(() => {
    if (productDetails?.color) {
      const colors = Array.isArray(productDetails?.color)
        ? productDetails?.color
        : productDetails?.color
        ? productDetails?.color.split(" and ")
        : [];
      setAvailableColors(colors);
      if (colors.length) {
        setSelectedColor(colors[0]);
      }
    }
  }, [productDetails?.color]);

  const handleQuantityChange = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleAdditionalDetailsChange = (event) => {
    setAdditionalDetails(event.target.value);
  };

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  // إعدادات الكاروسيل
  const sliderSettings = {
    dots: true,
    infinite: true, // إيقاف التكرار
    speed: 500,
    slidesToShow: 3, // عرض 3 صور في نفس الوقت
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true, // تفعيل الوضع المركزي
    focusOnSelect: true, // تحديد الصورة عند النقر عليها
    centerPadding: "30px", // تقليل المسافة بين الصور
    rtl: false, // تعطيل الاتجاه من اليمين لليسار
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
        });
      }
    });
  }
  // دالة لحساب السعر بناءً على الكمية
  const getDiscountedPrice = (quantity) => {
    // هنا بتختار السعر بناءً على الكمية من quantityPrices
    const price = productDetails?.quantityPrices?.find(
      (item) => item.quantity === quantity
    )?.price;

    return price || productDetails?.price; // لو مفيش سعر محدد للكمية هيرجع السعر الأصلي
  };

  // حساب التكلفة الكلية
  const totalCost = getDiscountedPrice(quantity);

  const images = productDetails?.image ? productDetails?.image.split(",") : [];

  const getDescription = () => {
    if (!productDetails?.description) return "";
    if (isExpanded) {
      return productDetails.description; // الوصف بالكامل عند التوسيع
    } else {
      // سيتم إرجاع الوصف فقط لأهم 3 أسطر
      const descriptionLines = productDetails.description.split("\n");
      return descriptionLines.slice(0, 3).join("\n"); // 3 أسطر فقط
    }
  };


  return (
    <div className="p-4 pt-0">
      <div className="relative overflow-hidden rounded-lg">
        {images.length > 1 ? (
          <div className="relative">
            <img
              src={selectedImage || images[0]} // إذا لم يتم تحديد صورة يتم عرض الصورة الأولى
              alt={productDetails?.title}
              className="aspect-square w-full h-[400px] object-cover rounded-lg mb-4"
            />
            <Slider
              {...sliderSettings}
              style={{ overflow: "hidden" }}
              className="slider-container"
            >
              {images.map((img, index) => (
                <div key={index} className="slider-image">
                  <img
                    src={img}
                    alt={`product-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                      maxWidth: "90px", // تصغير الحجم
                      maxHeight: "90px", // تصغير الحجم
                      margin: "0 5px", // تقليل المسافة بين الصور
                    }}
                    onClick={() => setSelectedImage(img)} // تغيير الصورة عند النقر
                  />
                </div>
              ))}
            </Slider>
          </div>
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
          <h1 className="text-3xl font-extrabold mt-3 text-center">
            {productDetails?.title}
          </h1>
          <p
        className="text-muted-foreground text-2xl mb-3 mt-4"
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
      {productDetails?.description.split("\n").length > 3 && (
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
            Choose color
          </label>
          {availableColors.length > 0 && (
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

        {(selectedColor === "black&white" || selectedColor === "white&black") &&
          (quantity > 1) && (
            <div className="mt-4">
              <label htmlFor="additionalInput" className="block font-bold">
                Additional Details
              </label>
              <textarea
                id="additionalInput"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="يرجى تحديد التفاصيل هنا..."
                value={additionalDetails}
                onChange={handleAdditionalDetailsChange}
              />
            </div>
          )}

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            <StarRatingComponent rating={rating} />
          </div>
          <span className="text-muted-foreground">({rating.toFixed(2)})</span>
        </div>
        <div className="mt-4 mb-4 w-full gap-4 flex justify-between">
          <Button
            style={{ width: "70%" }}
            onClick={() =>
              handleAddToCart(productDetails?._id, productDetails?.totalStock)
            }
          >
            Add to cart
          </Button>
          <Button style={{ width: "20%" }} onClick={shareProduct}>
            <Share2 />
          </Button>
        </div>

        <Separator />
        <div className="max-h-[300px] overflow-auto">
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
                  </div>
                </div>
              ))
            ) : (
              <h1>No reviews</h1>
            )}
          </div>
          <div className="mt-10 p-2 flex-col flex gap-2">
            <div className="flex gap-1">
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <Button onClick={handleAddReview}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileView;
