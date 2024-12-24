import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import StarRatingComponent from "../common/star-rating";
import { useState, useEffect } from "react";
import Slider from "react-slick"; // إضافة الكاروسيل
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // إضافة الفانكشن من الريدوكس
import { toast, useToast } from "../ui/use-toast";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function MobileView() {
  const { state } = useLocation(); // استلام البيانات المرسلة عبر التوجيه
  const productDetails = state?.productDetails; // استخراج بيانات المنتج
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
    setQuantity(parseInt(event.target.value));
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleAdditionalDetailsChange = (event) => {
    setAdditionalDetails(event.target.value);
  };

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  // إعدادات الكاروسيل
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

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // if (quantity > getTotalStock) {
    //   toast({
    //     title: `Only ${getTotalStock} items available in stock`,
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // تحقق من اللون والكمية لإرسال التفاصيل
    const shouldSubmitDetails =
      (selectedColor === "black&white" || selectedColor === "white&black") &&
      (quantity === 5 || quantity === 10);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity,
        color: selectedColor || "",
        additionalDetails: shouldSubmitDetails ? additionalDetails : "",
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: `Product added to cart${
            shouldSubmitDetails ? " with additional details" : ""
          }`,
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
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

  return (
    <div className="p-4">
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
            <p className="text-muted-foreground text-2xl mb-3 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              {productDetails?.salePrice === 0 ? (
                <p> {totalCost} EGP</p>
              ) : (
                <p> {productDetails?.price} EGP</p>
              )}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {totalCost} EGP
              </p>
            ) : null}
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
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
          {/* Text area for additional input */}
          {(selectedColor === "black&white" || selectedColor === "white&black") &&
            (quantity === 5 || quantity === 10) && (
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

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
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
                      {/* <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p> */}
                    </div>
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
              <Button onClick={handleAddReview}>Submit</Button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default MobileView;
