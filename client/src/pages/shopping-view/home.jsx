import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import Footer from "@/components/footer";
import ShoppingHeader from "@/components/shopping-view/header";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // استيراد مكتبة UUID لتوليد id عشوائي


const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  // { id: "kids", label: "Kids", icon: BabyIcon },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [limit, setLimit] = useState(4);

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
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // function handleAddToCard(getCurrentProductId) {
  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       quantity: 6,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user?.id));
  //       toast({
  //         title: "Product is added to cart",
  //       });
  //     }
  //   });
  // }
  // function handleAddToCard(getCurrentProductId) {
  //   // التحقق إذا كان المستخدم مسجل دخول أم لا
  //   if (user?.id) {
  //     // إذا كان مستخدم مسجل، استخدم الفانكشن الخاصة بالـ API
  //     dispatch(
  //       addToCart({
  //         userId: user?.id,
  //         productId: getCurrentProductId,
  //         quantity: 6,
  //       })
  //     ).then((data) => {
  //       if (data?.payload?.success) {
  //         dispatch(fetchCartItems(user?.id));
  //         toast({
  //           title: "Product is added to cart",
  //         });
  //       }
  //     });
  //   } else {
  //     // إذا كان زائر، استخدم localStorage
  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //     // التحقق من وجود المنتج في السلة وتحديث الكمية أو إضافة المنتج الجديد
  //     const productIndex = cart.findIndex(item => item.productId === getCurrentProductId);
  
  //     if (productIndex > -1) {
  //       // إذا كان المنتج موجودًا بالفعل في السلة، زيادة الكمية
  //       cart[productIndex].quantity += 1;
  //     } else {
  //       // إذا كان المنتج غير موجود، إضافة المنتج للسلة
  //       cart.push({
  //         productId: getCurrentProductId,
  //         quantity: 6, // أو أي قيمة كمية تبدأ منها
  //       });
  //     }
  
  //     // حفظ السلة المعدلة في localStorage
  //     localStorage.setItem("cart", JSON.stringify(cart));
  
  //     // إشعار المستخدم بنجاح إضافة المنتج
  //     toast({
  //       title: "Product is added to cart",
  //     });
  //   }
  // }
  
  // function handleAddToCard(getCurrentProductId) {
  //   // التحقق إذا كان المستخدم مسجل دخول أم لا
  //   if (user?.id) {
  //     // إذا كان مستخدم مسجل، استخدم الفانكشن الخاصة بالـ API
  //     dispatch(
  //       addToCart({
  //         userId: user?.id,
  //         productId: getCurrentProductId,
  //         quantity: 6,
  //       })
  //     ).then((data) => {
  //       if (data?.payload?.success) {
  //         dispatch(fetchCartItems(user?.id));
  //         toast({
  //           title: "Product is added to cart",
  //         });
  //       }
  //     });
  //   } else {
  //     // إذا كان زائر، استخدم localStorage
  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //     // التحقق من وجود المنتج في السلة وتحديث الكمية أو إضافة المنتج الجديد
  //     const productIndex = cart.findIndex(
  //       (item) => item.productId === getCurrentProductId
  //     );
  
  //     if (productIndex > -1) {
  //       // إذا كان المنتج موجودًا بالفعل في السلة، زيادة الكمية
  //       cart[productIndex].quantity += 1;
  //     } else {
  //       // إذا كان المنتج غير موجود، إضافة المنتج للسلة
  //       cart.push({
  //         productId: getCurrentProductId,
  //         quantity: 6, // أو أي قيمة كمية تبدأ منها
  //       });
  //     }
  
  //     // حفظ السلة المعدلة في localStorage
  //     localStorage.setItem("cart", JSON.stringify(cart));
  
  //     // إظهار العناصر الموجودة في السلة في console
  //     console.log("Guest cart contents:", cart);
  
  //     // إشعار المستخدم بنجاح إضافة المنتج
  //     toast({
  //       title: "Product is added to cart",
  //     });
  //   }
  // }



  // دالة لتوليد 
  


    // function handleAddToCard(getCurrentProductId) {
      // const userId = user?.id || generateUserId();  // توليد user.id عشوائي للزوار
      // localStorage.setItem("userId", userId); // حفظ الـ userId في localStorage لتجنب تغييره عند التحديث

  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       quantity: 6,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user?.id));
  //       toast({
  //         title: "Product is added to cart",
  //       });
  //     }
  //   });
  // }
  
  


  // function handleAddToCard(getCurrentProductId, productDetails) {
  //   // التحقق إذا كان المستخدم مسجل دخول أم لا
  //   if (user?.id) {
  //     // إذا كان مستخدم مسجل، استخدم الفانكشن الخاصة بالـ API
  //     dispatch(
  //       addToCart({
  //         userId: user?.id,
  //         productId: getCurrentProductId,
  //         quantity: 6,
  //         color: productDetails.color, // إذا كان المنتج يحتوي على لون
  //         additionalDetails: productDetails.additionalDetails, // إذا كان يحتوي على تفاصيل إضافية
  //       })
  //     ).then((data) => {
  //       if (data?.payload?.success) {
  //         dispatch(fetchCartItems(user?.id));
  //         toast({
  //           title: "Product is added to cart",
  //         });
  //       }
  //     });
  //   } else {
  //     // إذا كان زائر، استخدم localStorage
  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
  //     // التحقق من وجود المنتج في السلة وتحديث الكمية أو إضافة المنتج الجديد
  //     const productIndex = cart.findIndex(item => item.productId === getCurrentProductId);
    
  //     if (productIndex > -1) {
  //       // إذا كان المنتج موجودًا بالفعل في السلة، زيادة الكمية
  //       cart[productIndex].quantity += 1;
  //     } else {
  //       // إذا كان المنتج غير موجود، إضافة المنتج للسلة
  //       cart.push({
  //         productId: getCurrentProductId,
  //         quantity: 6, // أو أي قيمة كمية تبدأ منها
  //         title: productDetails.title, // اسم المنتج
  //         price: productDetails.price, // السعر
  //         salePrice: productDetails.salePrice, // السعر بعد الخصم
  //         image: productDetails.image, // رابط الصورة
  //         color: productDetails.color, // اللون
  //         additionalDetails: productDetails.additionalDetails, // التفاصيل الإضافية
  //       });
  //     }
    
  //     // حفظ السلة المعدلة في localStorage
  //     localStorage.setItem("cart", JSON.stringify(cart));
    
  //     // إشعار المستخدم بنجاح إضافة المنتج
  //     toast({
  //       title: "Product is added to cart",
  //     });
  //   }
  // }
  
  function handleAddToCard(getCurrentProductId) {
    // استخراج userId من الـ user المسجل أو من localStorage إذا كان زائر
    const userId = user?.id || localStorage.getItem('guestUserId');  
  
    // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
    if (!userId) {
      const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
      localStorage.setItem('guestUserId', generatedUserId);  // حفظه في localStorage
    }
  
    // إرسال الطلب فقط إذا كان لدينا userId
    if (userId) {
      dispatch(
        addToCart({
          userId,
          productId: getCurrentProductId,
          quantity: 6,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(userId));  // تمرير userId بدلاً من user?.id
          toast({
            title: "Product is added to cart",
          });
        }
      });
    } else {
      toast({
        title: "Unable to get User ID",
        variant: "destructive",
      });
    }
  }
  
  
  console.log(JSON.parse(localStorage.getItem("cart")));

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
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
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
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
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
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center  justify-center p-6">
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
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
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
      <div className="container mb-5">
        <Footer />
      </div>
    </div>
  );
}

export default ShoppingHome;
