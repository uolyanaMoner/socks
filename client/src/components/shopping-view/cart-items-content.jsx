// import { Minus, Plus, Trash } from "lucide-react";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";

// function UserCartItemsContent({ cartItem }) {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productList } = useSelector((state) => state.shopProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function handleUpdateQuantity(getCartItem, typeOfAction) {
//     if (typeOfAction == "plus") {
//       let getCartItems = cartItems.items || [];

//       if (getCartItems.length) {
//         const indexOfCurrentCartItem = getCartItems.findIndex(
//           (item) => item.productId === getCartItem?.productId
//         );

//         const getCurrentProductIndex = productList?.findIndex(
//           (product) => product._id === getCartItem?.productId
//         );
//         const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

//         console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

//         // if (indexOfCurrentCartItem > -1) {
//         //   const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
//         //   if (getQuantity + 1 > getTotalStock) {
//         //     toast({
//         //       title: `Only ${getQuantity} quantity can be added for this item`,
//         //       variant: "destructive",
//         //     });

//         //     return;
//         //   }
//         // }
//       }
//     }

//     dispatch(
//       updateCartQuantity({
//         userId: user?.id,
//         productId: getCartItem?.productId,
//         quantity:
//           typeOfAction === "plus"
//             ? getCartItem?.quantity + 1
//             : getCartItem?.quantity - 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Cart item is updated successfully",
//         });
//       }
//     });
//   }

//   function handleCartItemDelete(getCartItem) {
//     dispatch(
//       deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Cart item is deleted successfully",
//         });
//       }
//     });
//   }

//   return (
//     <div className="flex items-center space-x-4">
//       <img
//       src={cartItem?.image?.split(",")[0] || ""}
//       alt={cartItem?.title}
//       className="w-20 h-20 rounded object-cover"
//     />
//       <div className="flex-1">
//         <h3 className="font-extrabold">{cartItem?.title}</h3>
//         <div className="flex items-center gap-2 mt-1">
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             disabled={cartItem?.quantity === 1}
//             onClick={() => handleUpdateQuantity(cartItem, "minus")}
//           >
//             <Minus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//           <span className="font-semibold">{cartItem?.quantity}</span>
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             onClick={() => handleUpdateQuantity(cartItem, "plus")}
//           >
//             <Plus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col items-end">
//         <p className="font-semibold">
//           {(
//             (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
//             cartItem?.quantity
//           ).toFixed(2)} EGP

//         </p>
//         <Trash
//           onClick={() => handleCartItemDelete(cartItem)}
//           className="cursor-pointer mt-1"
//           size={20}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserCartItemsContent;


// import { Minus, Plus, Trash } from "lucide-react";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";
// import { useState, useEffect } from "react";

// function UserCartItemsContent({ cartItem }) {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productList } = useSelector((state) => state.shopProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   const [typeOfAction, setTypeOfAction] = useState(null);
//   const [currentQuantity, setCurrentQuantity] = useState(cartItem?.quantity); // حفظ الكمية الحالية

//   // استخراج userId
//   const userId = user?.id || localStorage.getItem("guestUserId");

//   if (!userId) {
//     const generatedUserId = `guest-${Date.now()}`;
//     localStorage.setItem("guestUserId", generatedUserId);
//   }

//   // دالة لتحديد السعر بناءً على الكمية
//   const getDiscountedPrice = (productId, quantity) => {
//     const product = productList?.find((item) => item._id === productId);
//     const price = product?.quantityPrices?.find(
//       (item) => item.quantity === quantity
//     )?.price;
//     return price || product?.price;
//   };

//   // دالة لتحديث الكمية في السلة
//   function handleUpdateQuantity(action) {
//     setTypeOfAction(action);
    
//     let newQuantity = currentQuantity + (action === "plus" ? 1 : -1);

//     // تأكد من أن الكمية لا تقل عن 1
//     if (newQuantity < 1) {
//       newQuantity = 1;
//     }

//     // تحديث الكمية في المتغير الحالي
//     setCurrentQuantity(newQuantity);

//     // إرسال التحديث
//     dispatch(
//       updateCartQuantity({
//         userId,
//         productId: cartItem?.productId,
//         quantity: newQuantity,
//       })
//     );
//   }

//   // دالة لحذف العنصر من السلة
//   function handleCartItemDelete(getCartItem) {
//     dispatch(
//       deleteCartItem({ userId, productId: getCartItem?.productId })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Cart item is deleted successfully",
//         });
//       }
//     });
//   }

//   // تحديد السعر بناءً على الكمية
//   const itemPrice = getDiscountedPrice(cartItem?.productId, currentQuantity);

//   return (
//     <div className="flex items-center space-x-4">
//       <img
//         src={cartItem?.image?.split(",")[0] || ""}
//         alt={cartItem?.title}
//         className="w-20 h-20 rounded object-cover"
//       />
//       <div className="flex-1">
//         <h3 className="font-extrabold">{cartItem?.title}</h3>
//         <div className="flex items-center gap-2 mt-1">
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             disabled={currentQuantity === 1}
//             onClick={() => handleUpdateQuantity("minus")}
//           >
//             <Minus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//           <span className="font-semibold">{currentQuantity}</span>
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             onClick={() => handleUpdateQuantity("plus")}
//           >
//             <Plus className="w-4 h-4" />
//             <span className="sr-only">Increase</span>
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col items-end">
//         {/* عرض السعر بناءً على الكمية */}
//         {currentQuantity === 1 || !cartItem?.quantityPrices ? (
//           <p className="font-semibold">{itemPrice} EGP</p>
//         ) : (
//           <p className="font-semibold">
//             {(itemPrice * currentQuantity).toFixed(2)} EGP
//           </p>
//         )}
//         <Trash
//           onClick={() => handleCartItemDelete(cartItem)}
//           className="cursor-pointer mt-1"
//           size={20}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserCartItemsContent;


import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentQuantity, setCurrentQuantity] = useState(cartItem?.quantity);

  // استخراج userId
  const userId = user?.id || localStorage.getItem("guestUserId");

  if (!userId) {
    const generatedUserId = `guest-${Date.now()}`;
    localStorage.setItem("guestUserId", generatedUserId);
  }

  // دالة لحساب السعر بناءً على الكمية المخصصة
  const getDiscountedPrice = (productId, quantity) => {
    const product = productList?.find((item) => item._id === productId);
    const price = product?.quantityPrices?.find(
      (item) => item.quantity === quantity
    )?.price;
    return price || null; // إذا لم يوجد سعر مخصص، تُعيد null
  };

  // دالة لحساب السعر بناءً على الكمية والسعر العادي
  const getPriceBasedOnQuantity = (productId, quantity) => {
    const product = productList?.find((item) => item._id === productId);
    const price = product?.salePrice > 0 ? product.salePrice : product?.price;
    return price * quantity;
  };

  // دالة لتحديث الكمية في السلة
  function handleUpdateQuantity(action) {
    let newQuantity = currentQuantity + (action === "plus" ? 1 : -1);

    // تأكد من أن الكمية لا تقل عن 1
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    setCurrentQuantity(newQuantity);

    // تحديث الكمية في Redux
    dispatch(
      updateCartQuantity({
        userId,
        productId: cartItem?.productId,
        quantity: newQuantity,
      })
    );
  }

  // دالة لحذف العنصر من السلة
  function handleCartItemDelete(getCartItem) {

    dispatch(deleteCartItem({ userId, productId: getCartItem?.productId })).then(
      (data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item is deleted successfully",
            style: {
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              bottom:  "20px" , // أسفل الصفحة عند الموبايل
            },
          });
        }
      }
    );
  }

  // حساب السعر النهائي
  const discountedPrice = getDiscountedPrice(cartItem?.productId, currentQuantity);
  const finalPrice = discountedPrice
    ? discountedPrice
    : getPriceBasedOnQuantity(cartItem?.productId, currentQuantity);

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image?.split(",")[0] || ""}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-2">
      <h3 className="font-extrabold text-sm text-gray-600 mr-2">Color:</h3>
      <span
        className="block w-6 h-6 rounded-full border border-gray-300"
        style={{
          background:
            cartItem?.color === "black&white"
              ? "linear-gradient(to right, black 50%, white 50%)"
              : cartItem?.color,
        }}
      ></span>
    </div>

        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={currentQuantity === 1}
            onClick={() => handleUpdateQuantity("minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{currentQuantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity("plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">{finalPrice.toFixed(2)} EGP</p>

        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
