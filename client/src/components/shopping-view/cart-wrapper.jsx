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


// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";
// import { useSelector } from "react-redux";

// function UserCartWrapper({ cartItems, setOpenCartSheet }) {
//   const { user } = useSelector((state) => state.auth);
  
//   // استخراج userId من المستخدم أو من localStorage للزائر
//   const userId = user?.id || localStorage.getItem("guestUserId");

//   // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
//   if (!userId) {
//     const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
//     localStorage.setItem("guestUserId", generatedUserId); // حفظه في localStorage
//   }

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

//   console.log(cartItems);

//   return (
//     <SheetContent className="sm:max-w-md">
//       <SheetHeader>
//         <SheetTitle>Your Cart</SheetTitle>
//       </SheetHeader>
//       <div className="mt-8 space-y-4">
//         {cartItems && cartItems.length > 0
//           ? cartItems.map((item) => (
//               <UserCartItemsContent key={item.id} cartItem={item} userId={userId} />
//             ))
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
import { useSelector } from "react-redux";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const { user } = useSelector((state) => state.auth);

  // استخراج userId من المستخدم أو من localStorage للزائر
  const userId = user?.id || localStorage.getItem("guestUserId");

  // إذا لم يكن هناك userId، نقوم بإنشاء userId جديد للزائر
  if (!userId) {
    const generatedUserId = `guest-${Date.now()}`; // توليد userId فريد للزائر
    localStorage.setItem("guestUserId", generatedUserId); // حفظه في localStorage
  }

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
    <SheetContent className="w-full sm:max-w-md md:max-w-md p-4 sm:px-6 lg:px-8">
      <SheetHeader>
        <SheetTitle className="text-center sm:text-left ">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
        {/* إضافة التمرير */}
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} userId={userId} />
          ))
        ) : (
          <div className="text-center">Your cart is empty</div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-bold ">Total</span>
          <span className="font-bold ">{totalCartAmount} EGP</span>
        </div>
      </div>

      <Button
      style={{ width :'100%' }}
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full sm:w-auto mt-6 mx-auto lg:w-auto"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
