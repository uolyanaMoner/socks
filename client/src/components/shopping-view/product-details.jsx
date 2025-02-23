import {
  Award,
  CloudLightning,
  Earth,
  ShieldCheck,
  ShirtIcon,
  StarIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
import { Card, CardContent } from "../ui/card";

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
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const storedShowMessage =
      JSON.parse(localStorage.getItem("showMessage")) || false;
    setShowMessage(storedShowMessage);
  }, []);

  const toggleShowMessage = () => {
    setShowMessage((prev) => {
      const newState = !prev;
      localStorage.setItem("showMessage", JSON.stringify(newState));
      return newState;
    });
  };

  //for size
  const [isOpen, setIsOpen] = useState(false);
  const toggleSizeGuide = () => {
    setIsOpen(!isOpen);
  };

  //for delivery
  const [openSection, setOpenSection] = useState(null);

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "delivery",
      title: "التوصيل",
      content: "التوصيل من يومين ل 4 ايام كحد اقصى علي حسب مكانك",
    },
    {
      id: "return",
      title: "سياسة الاستبدال و الاسترجاع",
      content:
        "الاسترجاع متاح في وجود المندوب فقط و مسموح بفتح الاوردر ولا يوجد استرجاع بعد مغادرة مندوب الشحن و لو كنت غير متواجد عند التسليم يوجد استرجاع مع دفع ثمن الشحن في حالة وجود خطا في المنتج او عيوب صناعة",
    },
    {
      id: "warranty",
      title: "الضمان",
      content:
        "تقدر تستعمل الشرابات 30 يوم لو فيها حاجة في عيوب التصنيع تقدر تسترجعها",
    },
  ];

  // التحقق من حالة التبديل عند تحميل المكون
  useEffect(() => {
    const storedValue = JSON.parse(
      localStorage.getItem(`showMessage-${productDetails?._id}`)
    );
    if (storedValue) {
      setShowMessage(true); // إذا كانت القيمة true، عرض الرسالة
    } else {
      setShowMessage(false);
    }
  }, [productDetails?._id]); // يعتمد على productId لتحديث الحالة عند تغييره

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity); // تحديث الكمية التي تم اختيارها
    // هنا يمكن أيضًا تحديث الكارت إذا كنت بحاجة إلى إضافة الكمية المختارة إليه
  };

  // const getDiscountedPrice = (quantity) => {
  //   return (
  //     productDetails?.quantityPrices?.find((item) => item.quantity === quantity)
  //       ?.price || productDetails?.price
  //   );
  // };

  const getDiscountedPrice = (productId, quantity) => {
    const product = productList?.find((item) => item._id === productId);
  
    console.log("🔍 Checking Discounted Price for:", { productId, quantity, product });
  
    if (!product) {
      console.log("⚠️ Product not found!");
      return 0;
    }
  
    // البحث عن الكمية المطلوبة
    const quantityPrice = product?.quantityPrices?.find(
      (item) => item.quantity === quantity
    );
  
    console.log("✅ Found Quantity Price:", quantityPrice);
  
    // ✅ استخدام `discountedPrice` لو موجود، وإلا `price`
    const finalPrice = quantityPrice
      ? quantityPrice.discountedPrice ?? quantityPrice.price
      : product.price * quantity;
  
    console.log("💰 Final Price:", finalPrice);
  
    return finalPrice;
  };
  

  const getOriginalPrice = (quantity) => {
    return productDetails?.quantityPrices?.find(
      (item) => item.quantity === quantity
    )?.originalPrice;
  };

  const getDiscountLabel = (quantity) => {
    return productDetails?.quantityPrices?.find(
      (item) => item.quantity === quantity
    )?.discountLabel;
  };

  const getOfferLabel = (quantity) => {
    return productDetails?.quantityPrices?.find(
      (item) => item.quantity === quantity
    )?.offerLabel;
  };

  const getPricePerItem = (quantity) => {
    return (
      productDetails?.quantityPrices?.find((item) => item.quantity === quantity)
        ?.pricePerItem || (getDiscountedPrice(quantity) / quantity).toFixed(2)
    );
  };

  const handleColorChange = (color) => {
    setSelectedColor(color); // تغيير اللون المختار عند النقر على أحد الأزرار
  };

  // const handleQuantityChange = (event) => {
  //   setQuantity(parseInt(event.target.value));
  // };

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size); // تحديث الحالة لاختيار المقاس
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

  useEffect(() => {
    const sizes = Array.isArray(productDetails?.size)
      ? productDetails?.size
      : productDetails?.size
      ? productDetails?.size.split(" and ")
      : [];

    setAvailableSizes(sizes);

    if (sizes.length) {
      setSelectedSize(sizes[0]); // اختيار الحجم الأول تلقائيًا
    }
  }, [productDetails?.size]);

 
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

  // function handleAddToCart(getCurrentProductId, getTotalStock) {
  //   const userId = user?.id || localStorage.getItem("guestUserId");

  //   if (!userId) {
  //     const generatedUserId = `guest-${Date.now()}`;
  //     localStorage.setItem("guestUserId", generatedUserId);
  //   }

  //   let selectedPrice = getDiscountedPrice(selectedQuantity); // Use the price based on quantity selection

  //   const cartItem = {
  //     userId,
  //     productId: getCurrentProductId,
  //     quantity: selectedQuantity,
  //     price: selectedPrice,
  //     color: selectedColor || "defaultColor",
  //     additionalDetails: additionalDetails,
  //     ...(availableSizes.length > 0 && { size: selectedSize }), // تضمين الحجم فقط إذا كان متاحًا
  //   };
  //   console.log("cartItem", cartItem);
  //   // Dispatch action to add the product to cart
  //   dispatch(addToCart(cartItem)).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(userId));
  //       toast({
  //         title: "Product is added to cart",
  //         style: {
  //           position: "fixed",
  //           left: "50%",
  //           transform: "translateX(-50%)",
  //           bottom: "20px", // أسفل الصفحة عند الموبايل
  //         },
  //       });
  //     }
  //   });
  // }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let userId = user?.id || localStorage.getItem("guestUserId");
  
    if (!userId) {
      userId = `guest-${Date.now()}`;
      localStorage.setItem("guestUserId", userId);
    }
  
    console.log("🛒 Adding to Cart:", { userId, getCurrentProductId, selectedQuantity });
  
    // ✅ جلب السعر المخفض أو العادي
    let selectedPrice = getDiscountedPrice(getCurrentProductId, selectedQuantity);
  
    console.log("🛒 Selected Price Before Adding to Cart:", selectedPrice);
  
    const cartItem = {
      userId,
      productId: getCurrentProductId,
      quantity: selectedQuantity,
      price: selectedPrice,
      color: selectedColor || "defaultColor",
      additionalDetails: additionalDetails,
      ...(availableSizes.length > 0 && { size: selectedSize }),
    };
  
    console.log("✅ Final Cart Item:", cartItem);
  
    dispatch(addToCart(cartItem)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(userId));
        console.log("✅ Product added successfully!");
  
        toast({
          title: "Product is added to cart",
          style: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "20px",
          },
        });
      } else {
        console.log("❌ Error adding product to cart!");
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

  // const getDiscountedPrice = (quantity) => {
  //   // هنا بتختار السعر بناءً على الكمية من quantityPrices
  //   const price = productDetails?.quantityPrices?.find(
  //     (item) => item.quantity === quantity
  //   )?.price;

  //   return price || productDetails?.price; // لو مفيش سعر محدد للكمية هيرجع السعر الأصلي
  // };

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

  const categoriesWithIcon = [
    { id: "quality", label: "High quality", icon: Award },
    { id: "safe", label: "Safe to use", icon: ShieldCheck },
    { id: "friend", label: "Eco-friendly", icon: Earth },
    { id: "best", label: "Best in the market", icon: Award },
  ];

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 lg:max-h-[780px] max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          {images.length > 1 ? (
            <Slider {...sliderSettings} style={{ overflow: "hidden" }}>
              {images.map((img, index) => (
                <div key={index} style={{ borderRadius: "8px" }}>
                  <img
                    className="h-[500px]"
                    src={img}
                    alt={`product-${index}`}
                    style={{
                      width: "100%",
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
        <div className="overflow-y-auto max-h-[500px]">
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

          {/* <section className="mb-4 bg-blue-50 rounded-xl py-4">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-4 gap-4 items-center text-center">
                {categoriesWithIcon.map((categoryItem, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <categoryItem.icon className="w-8 h-8 text-gray-700" />
                    <span className="font-medium text-sm text-gray-700 mt-2">
                      {categoryItem.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          <div className="grid grid-cols-2 gap-4 mb-3">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-6 h-6 mb-2 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* <div className="flex items-center justify-between">
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
          </div> */}
          {/* <div>
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
          </div> */}
          {availableColors.length > 0 && (
            <div>
              <label htmlFor="color" className="block font-bold">
                Choose Color:
              </label>
              <div className="flex gap-3 mt-2">
                {availableColors.map((color, index) => (
                  <div key={index} className="relative group">
                    {/* الزر الدائري مع اللون */}
                    <button
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 border-gray-300 ${
                        selectedColor === color
                          ? `border-${color} ring-2 ring-${color}`
                          : "bg-gray-200"
                      }`}
                      style={{
                        backgroundColor:
                          color === "black&white"
                            ? "transparent" // إذا كان اللون black&white نتركه شفاف
                            : color, // إذا كان لون آخر نعرضه بشكل طبيعي
                        backgroundImage:
                          color === "black&white"
                            ? "linear-gradient(135deg, #000000 50%, #FFFFFF 50%)" // تقسيم نصف دايرتين إلى أسود وأبيض
                            : "", // إذا كان اللون غير black&white لا نستخدم التدرج
                      }}
                      onClick={() => handleColorChange(color)} // تغيير اللون عند النقر
                      aria-label={`Select ${color}`}
                    >
                      {/* عرض العلامة عند التحديد */}
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                    {/* اسم اللون يظهر عند التمرير */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {color === "black&white"
                        ? "Black & White"
                        : color.charAt(0).toUpperCase() + color.slice(1)}{" "}
                      {/* اسم اللون */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 
          {availableSizes.length > 0 && (
            <div className="mt-1">
              <label htmlFor="size" className="block font-bold">
                Choose Size:
              </label>
              <select
                id="size"
                value={selectedSize}
                onChange={handleSizeChange}
                className="border rounded p-2 w-full"
              >
                {availableSizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )} */}

          {availableSizes.length > 0 && (
            <div className="mt-4">
              <label htmlFor="size" className="block font-bold">
                Choose Size:
              </label>
              <div className="flex gap-3 mt-2">
                {availableSizes.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition duration-300 ${
                      selectedSize === size
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                    onClick={() => handleSizeChange(size)} // تغيير الحجم عند النقر
                    aria-label={`Select ${size}`}
                  >
                    {size.toUpperCase()} {/* عرض الحجم */}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* <div>
            {showMessage && (
              <div className="max-w-xs mx-auto mb-1 mt-4 mb-4 ">
                <button
                  onClick={toggleSizeGuide}
                  className="w-full flex items-center justify-between text-left text-xl font-semibold mb-4"
                >
                  <span>Size Guide</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isOpen && (
                  <ul className="space-y-2">
                    {[
                      { size: "M", details: "60-70 kg / 29-31 in jeans" },
                      { size: "L", details: "70-90 kg / 32-35 in jeans" },
                      { size: "XL", details: "90-110 kg / 36-38 in jeans" },
                      { size: "2XL", details: "110-130 kg / 39-44 in jeans" },
                    ].map((item) => (
                      <li
                        key={item.size}
                        className="flex justify-between p-2 border-b border-gray-300"
                      >
                        <span className="font-semibold">{item.size}</span>
                        <span className="text-gray-600">{item.details}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div> */}
          <div>
            {showMessage && (
              <div className="max-w-xs mx-auto mb-1 mt-4 mb-4">
                <button
                  onClick={toggleSizeGuide}
                  className="w-full flex items-center justify-between text-left text-xl font-semibold mb-4"
                >
                  <span>Size Guide</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isOpen && (
                  <ul className="space-y-2">
                    {[
                      { size: "M", details: "60-70 kg / 29-31 in jeans" },
                      { size: "L", details: "70-90 kg / 32-35 in jeans" },
                      { size: "XL", details: "90-110 kg / 36-38 in jeans" },
                      { size: "2XL", details: "110-130 kg / 39-44 in jeans" },
                    ].map((item) => (
                      <li
                        key={item.size}
                        className="flex justify-between p-2 border-b border-gray-300"
                      >
                        <span className="font-semibold">{item.size}</span>
                        <span className="text-gray-600">{item.details}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>


          {/* 
          <div className="mt-1">
            <Label>Quantity</Label>
            <select
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              إضافة خيار الكمية 1 كخيار ثابت
           <option value={1}>1</option>

              {productDetails?.quantityPrices?.map((item, index) => (
                <option key={index} value={item.quantity}>
                  {item.quantity}
                </option>
              ))}
            </select>
          </div> */}
          {/* 
          <div className="mt-1 space-y-3">
            {(() => {
              const quantityPrices = productDetails?.quantityPrices
                ?.slice()
                .sort((a, b) => a.quantity - b.quantity);

              const minPricePerItem = Math.min(
                ...quantityPrices.map((i) => getPricePerItem(i.quantity))
              );

              return quantityPrices.map((item, index) => {
                const pricePerItem = getPricePerItem(item.quantity);

                const isBestSaving = pricePerItem == minPricePerItem;
                const filteredArray = quantityPrices.filter(
                  (i) => i.quantity !== 1
                );
                const isMostPopular =
                  item.quantity ===
                  Math.max(...filteredArray.map((i) => i.quantity));

                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 relative cursor-pointer transition duration-300 hover:shadow-lg hover:border-blue-400 ${
                      selectedQuantity === item.quantity
                        ? "border-blue-500 shadow-md"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleQuantityChange(item.quantity)}
                  >
                    <div className="absolute -top-3 left-2 flex gap-2">
                      {isMostPopular && (
                        <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                          Most Popular
                        </div>
                      )}
                      {isBestSaving && (
                        <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                          Best Saving
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-800 font-semibold text-lg">
                        {`Buy ${item.quantity}`}
                      </div>
                      <input
                        type="radio"
                        checked={selectedQuantity === item.quantity}
                        readOnly
                        className="form-radio text-blue-500 w-5 h-5"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-primary">
                        {getDiscountedPrice(item.quantity)} EGP
                      </p>
                      {getOriginalPrice(item.quantity) && (
                        <p className="text-lg line-through text-gray-400">
                          {getOriginalPrice(item.quantity)} EGP
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-1 font-bold bg-gray-100 px-2 py-1 inline-block rounded">
                      {`Price per item: ${pricePerItem} EGP`}
                    </p>

                    {getDiscountLabel(item.quantity) && (
                      <div className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded mt-1 inline-block">
                        {getDiscountLabel(item.quantity)}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div> */}

          {/* <div className="mt-3 space-y-3">
            {(() => {
              const quantityPrices = productDetails?.quantityPrices
                ?.slice()
                .sort((a, b) => a.quantity - b.quantity);

              // احسب أقل سعر للوحدة وثبته بصيغة متناسقة
              const minPricePerItem = Math.min(
                ...quantityPrices.map((i) =>
                  i.discountedPrice
                    ? i.discountedPrice / i.quantity
                    : i.price / i.quantity
                )
              ).toFixed(2);

              return quantityPrices.map((item, index) => {
                const pricePerItem = item.discountedPrice
                  ? (item.discountedPrice / item.quantity).toFixed(2)
                  : (item.price / item.quantity).toFixed(2);

                // استخدم <= بدل ==
                const isBestSaving = pricePerItem <= minPricePerItem;

                const filteredArray = quantityPrices.filter(
                  (i) => i.quantity !== 1
                );
                const isMostPopular =
                  item.quantity ===
                  Math.max(...filteredArray.map((i) => i.quantity));

                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 relative cursor-pointer transition duration-300 hover:shadow-lg hover:border-blue-400 ${
                      selectedQuantity === item.quantity
                        ? "border-blue-500 shadow-md"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleQuantityChange(item.quantity)}
                  >
                    <div className="absolute -top-3 left-2 flex gap-2">
                      {isMostPopular && (
                        <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                          Most Popular
                        </div>
                      )}
                      {isBestSaving && (
                        <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                          Best Saving
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-800 font-semibold text-lg">
                        {`Buy ${item.quantity}`}
                      </div>
                      <input
                        type="radio"
                        checked={selectedQuantity === item.quantity}
                        readOnly
                        className="form-radio text-blue-500 w-5 h-5"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-primary">
                        {item.discountedPrice
                          ? `${item.discountedPrice} EGP`
                          : `${item.price} EGP`}
                      </p>
                      {item.discountedPrice && (
                        <p className="text-lg line-through text-gray-400">
                          {item.price} EGP
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-1 font-bold bg-gray-100 px-2 py-1 inline-block rounded">
                      {`Price per item: ${pricePerItem} EGP`}
                    </p>
                  </div>
                );
              });
            })()}
          </div> */}

<div className="mt-3 space-y-3">
  {(() => {
    const quantityPrices = productDetails?.quantityPrices
      ?.slice()
      .sort((a, b) => a.quantity - b.quantity);

    const minPricePerItem = Math.min(
      ...quantityPrices.map((i) =>
        i.discountedPrice
          ? i.discountedPrice / i.quantity
          : i.price / i.quantity
      )
    ).toFixed(2);

    return quantityPrices.map((item, index) => {
      const pricePerItem = item.discountedPrice
        ? (item.discountedPrice / item.quantity).toFixed(2)
        : (item.price / item.quantity).toFixed(2);

      const isBestSaving = pricePerItem <= minPricePerItem;

      const filteredArray = quantityPrices.filter((i) => i.quantity !== 1);
      const isMostPopular =
        item.quantity === Math.max(...filteredArray.map((i) => i.quantity));

      return (
        <div
          key={index}
          className={`border rounded-lg p-4 relative cursor-pointer transition duration-300 hover:shadow-lg hover:border-blue-400 ${
            selectedQuantity === item.quantity
              ? "border-blue-500 shadow-md"
              : "border-gray-300"
          }`}
          onClick={() => handleQuantityChange(item.quantity)}
        >
          <div className="absolute -top-3 left-2 flex gap-2">
            {isMostPopular && (
              <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Most Popular
              </div>
            )}
            {isBestSaving && (
              <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Best Saving
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-800 font-semibold text-lg">
              {`Buy ${item.quantity}`}
            </div>
            <input
              type="radio"
              checked={selectedQuantity === item.quantity}
              readOnly
              className="form-radio text-blue-500 w-5 h-5"
            />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-primary">
              {item.discountedPrice
                ? `${item.discountedPrice} EGP`
                : `${item.price} EGP`}
            </p>
            {item.discountedPrice && (
              <p className="text-lg line-through text-gray-400">
                {item.price} EGP
              </p>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1 font-bold bg-gray-100 px-2 py-1 inline-block rounded">
            {`Price per item: ${pricePerItem} EGP`}
          </p>
        </div>
      );
    });
  })()}
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
          <div className="space-y-4 text-right" dir="rtl">
            {sections.map(({ id, title, content }) => (
              <div key={id} className="border rounded-lg p-4">
                <div
                  className="flex items-center  text-right justify-between cursor-pointer"
                  onClick={() => handleToggle(id)}
                >
                  <h3 className="font-semibold  text-right text-lg">{title}</h3>
                  {openSection === id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                {openSection === id && (
                  <p className="mt-2 text-gray-600">{content}</p>
                )}
              </div>
            ))}
          </div>

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
