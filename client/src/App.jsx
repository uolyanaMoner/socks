// import { Route, Routes } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminProducts from "./pages/admin-view/products";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminFeatures from "./pages/admin-view/features";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingListing from "./pages/shopping-view/listing";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingAccount from "./pages/shopping-view/account";
// import CheckAuth from "./components/common/check-auth";
// import UnauthPage from "./pages/unauth-page";
// import { useDispatch, useSelector } from "react-redux";
// import { Skeleton } from "./components/ui/skeleton";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";
// import PaymobReturnPage from "./pages/shopping-view/paymob";
// import MobileView from "./components/shopping-view/productMobileView";


// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();


//   console.log(user);

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);


//   if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />


//   console.log(isLoading, user);
//   console.log(user);


//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       <Routes>
//         <Route
//         path="/"
//         element={
//           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           </CheckAuth>
//         }
//         />
//          {/* <Route path="/" element={<ShoppingHome />} /> */}
//         <Route
//           path="/auth"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AuthLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="login" element={<AuthLogin />} />
//           <Route path="register" element={<AuthRegister />} />
//         </Route>
//         <Route
//           path="/admin"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AdminLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="orders" element={<AdminOrders />} />
//           <Route path="features" element={<AdminFeatures />} />
//         </Route>
//         <Route
//           path="/shop"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <ShoppingLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="home" element={<ShoppingHome />} />
//           <Route path="listing" element={<ShoppingListing />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="account" element={<ShoppingAccount />} />
//           <Route path="mobile-view" element={<MobileView />} />
//           <Route path="paymob-return" element={<PaymobReturnPage />} />
//           <Route path="payment-success" element={<PaymentSuccessPage/>}/>
//           <Route path="search" element={<SearchProducts/>}/>
//         </Route>
//         <Route path="/unauth-page" element={<UnauthPage />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


// import { Route, Routes, Navigate } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminProducts from "./pages/admin-view/products";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminFeatures from "./pages/admin-view/features";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingListing from "./pages/shopping-view/listing";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingAccount from "./pages/shopping-view/account";
// import CheckAuth from "./components/common/check-auth";
// import UnauthPage from "./pages/unauth-page";
// import { useDispatch, useSelector } from "react-redux";
// import { Skeleton } from "./components/ui/skeleton";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";
// import PaymobReturnPage from "./pages/shopping-view/paymob";
// import MobileView from "./components/shopping-view/productMobileView";
// import AdminOrderDetailsView from "./components/admin-view/order-details";

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       <Routes>
//         {/* صفحة / الآن ستوجهك إلى الـ Home مباشرة */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               user?.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" />
//               ) : (
//                 <Navigate to="/shop/home" />
//               )
//             ) : (
//               <Navigate to="/shop/home" />
//             )
//           }
//         />

//         <Route path="/auth" element={<AuthLayout />}>
//           <Route
//             path="login"
//             element={
//               <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                 <AuthLogin />
//               </CheckAuth>
//             }
//           />
//           <Route
//             path="register"
//             element={
//               <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                 <AuthRegister />
//               </CheckAuth>
//             }
//           />
//         </Route>

//         {/* صفحات الأدمن فقط إذا كان المستخدم أدمن */}
//         {isAuthenticated && user?.role === "admin" && (
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="products" element={<AdminProducts />} />
//             <Route path="orders" element={<AdminOrders />} />
//             <Route path="orders/:orderId" element={<AdminOrderDetailsView />} />

//             <Route path="features" element={<AdminFeatures />} />
//           </Route>
//         )}

//         {/* الصفحات الخاصة بالمتسوقين */}
//         <Route path="/shop" element={<ShoppingLayout />}>
//           <Route path="home" element={<ShoppingHome />} />
//           <Route path="listing" element={<ShoppingListing />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="account" element={<ShoppingAccount />} />
//           <Route path="mobile-view/:productId" element={<MobileView />} />
//           <Route path="paymob-return" element={<PaymobReturnPage />} />
//           <Route path="payment-success" element={<PaymentSuccessPage />} />
//           <Route path="search" element={<SearchProducts />} />
//         </Route>

//         {/* صفحة غير معتمدة */}
//         <Route path="/unauth-page" element={<UnauthPage />} />

//         {/* صفحة 404 إذا كانت الصفحة غير موجودة */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;




import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "./components/ui/skeleton";
import { checkAuth } from "./store/auth-slice";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import PaymobReturnPage from "./pages/shopping-view/paymob";
import MobileView from "./components/shopping-view/productMobileView";
import AdminOrderDetailsView from "./components/admin-view/order-details";
import ConsentBanner from "./pages/shopping-view/consentBanner";
import PartitionProducts from "./components/shopping-view/partition-products";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // تفعيل Google Analytics
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-4SM8W65KXV";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // تأكد من أن gtag تم تعريفه قبل استخدامه
      if (typeof gtag !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-4SM8W65KXV");
      }
    };
  }, []);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ConsentBanner />
      <Routes>
        {/* صفحة / الآن ستوجهك إلى الـ Home مباشرة */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/shop/home" />
              )
            ) : (
              <Navigate to="/shop/home" />
            )
          }
        />

        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="login"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLogin />
              </CheckAuth>
            }
          />
          <Route
            path="register"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthRegister />
              </CheckAuth>
            }
          />
        </Route>

        {/* صفحات الأدمن فقط إذا كان المستخدم أدمن */}
        {isAuthenticated && user?.role === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:orderId" element={<AdminOrderDetailsView />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
        )}

        {/* الصفحات الخاصة بالمتسوقين */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="mobile-view/:productId" element={<MobileView />} />
          <Route path="partition/:partitionId" element={<PartitionProducts />} />
          <Route path="paymob-return" element={<PaymobReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* صفحة غير معتمدة */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* صفحة 404 إذا كانت الصفحة غير موجودة */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
