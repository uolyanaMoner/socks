// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";

// function UserCartWrapper({ cartItems, setOpenCartSheet }) {
//   const navigate = useNavigate();

//   const totalCartAmount =
//     cartItems && cartItems.length > 0
//       ? cartItems.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//       console.log(cartItems)

//   return (
//     <SheetContent className="sm:max-w-md">
//       <SheetHeader>
//         <SheetTitle>Your Cart</SheetTitle>
//       </SheetHeader>
//       <div className="mt-8 space-y-4" >
//         {cartItems && cartItems.length > 0
//           ? cartItems.map((item) => <UserCartItemsContent key={item.id} cartItem={item} />)
//           : null}
//       </div>
//       <div className="mt-8 space-y-4">
//         <div className="flex justify-between">
//           <span className="font-bold">Total</span>
//           <span className="font-bold">{totalCartAmount} EGP</span>
//         </div>
//       </div>
//       <Button
//         onClick={() => {
//           navigate("/shop/checkout");
//           setOpenCartSheet(false);
//         }}
//         className="w-full mt-6"
//       >
//         Checkout
//       </Button>
//     </SheetContent>
//   );
// }

// export default UserCartWrapper;
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="w-full sm:max-w-md px-4 sm:px-6 py-4 sm:py-6">
      <SheetHeader>
        <SheetTitle className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      {/* عرض محتوى السلة مع السكرول */}
      <div className="mt-4 sm:mt-6 space-y-4 overflow-y-auto max-h-[300px] sm:max-h-[400px]">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} />
          ))
        ) : (
          <p className="text-center text-muted-foreground text-sm sm:text-base">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* إجمالي السلة */}
      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
        <div className="flex justify-between text-sm sm:text-base font-medium">
          <span>Total</span>
          <span>{totalCartAmount} EGP</span>
        </div>
      </div>

      {/* زر الإتمام */}
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 py-2 sm:py-3 text-sm sm:text-base"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
