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
// import { useState, useEffect } from "react";
// import { useToast } from "../ui/use-toast";

// function GuestCartItemsContent({ cartItem }) {
//   const [guestCart, setGuestCart] = useState([]);
//   const { toast } = useToast();

//   // تحميل السلة من localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem("guestCart");
//     if (savedCart) {
//       setGuestCart(JSON.parse(savedCart));
//     }
//   }, []);

//   // تحديث السلة في localStorage
//   const updateLocalStorage = (updatedCart) => {
//     localStorage.setItem("guestCart", JSON.stringify(updatedCart));
//     setGuestCart(updatedCart);
//   };

//   // تحديث الكمية
//   function handleUpdateQuantity(getCartItem, typeOfAction) {
//     let updatedCart = [...guestCart];

//     const indexOfCurrentCartItem = updatedCart.findIndex(
//       (item) => item.productId === getCartItem.productId
//     );

//     if (indexOfCurrentCartItem > -1) {
//       const currentItem = updatedCart[indexOfCurrentCartItem];

//       if (typeOfAction === "plus") {
//         updatedCart[indexOfCurrentCartItem] = {
//           ...currentItem,
//           quantity: currentItem.quantity + 1,
//         };
//       } else if (typeOfAction === "minus" && currentItem.quantity > 1) {
//         updatedCart[indexOfCurrentCartItem] = {
//           ...currentItem,
//           quantity: currentItem.quantity - 1,
//         };
//       }

//       // تحديث السلة في localStorage
//       updateLocalStorage(updatedCart);
//       toast({
//         title: "Cart item updated successfully",
//       });
//     }
//   }

//   // حذف العنصر من السلة
//   function handleCartItemDelete(getCartItem) {
//     let updatedCart = guestCart.filter(
//       (item) => item.productId !== getCartItem.productId
//     );

//     // تحديث السلة في localStorage
//     updateLocalStorage(updatedCart);
//     toast({
//       title: "Cart item deleted successfully",
//     });
//   }

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
//             <span className="sr-only">Increase</span>
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col items-end">
//         <p className="font-semibold">
//           {(
//             (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
//             cartItem?.quantity
//           ).toFixed(2)}{" "}
//           EGP
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

// export default GuestCartItemsContent;


import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // استخراج userId المستخدم أو إنشاء userId للزائر إذا لم يكن هناك مستخدم مسجل
  const userId = user?.id || localStorage.getItem("guestUserId");

  // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
  if (!userId) {
    const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
    localStorage.setItem("guestUserId", generatedUserId); // حفظه في localStorage
  }

  // دالة لتحديث الكمية في السلة
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList?.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        // if (indexOfCurrentCartItem > -1) {
        //   const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        //   if (getQuantity + 1 > getTotalStock) {
        //     toast({
        //       title: `Only ${getQuantity} quantity can be added for this item`,
        //       variant: "destructive",
        //     });

        //     return;
        //   }
        // }
      }
    }

    // إرسال userId مع التحديث
    dispatch(
      updateCartQuantity({
        userId, // استخدام userId المسجل أو الزائر
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  // دالة لحذف عنصر من السلة
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId, productId: getCartItem?.productId }) // استخدام userId هنا أيضًا
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image?.split(",")[0] || ""}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)} EGP
        </p>
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
