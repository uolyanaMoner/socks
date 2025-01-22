// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Dialog } from "../ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import AdminOrderDetailsView from "./order-details";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice";
// import { Badge } from "../ui/badge";

// function AdminOrdersView() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
//   const dispatch = useDispatch();

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetailsForAdmin(getId));
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin());
//   }, [dispatch]);

//   console.log(orderDetails, "orderList");

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true);
//   }, [orderDetails]);

//   return isMobile ? (
//     <Card className="p-4">
//       <CardHeader>
//         <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {orderList && orderList.length > 0 ? (
//           <div className="grid grid-cols-1 gap-4 md:table md:table-fixed">
//             {/* Table Header for larger screens */}
//             <div className="hidden md:table-header-group">
//               <div className="table-row font-bold">
//                 <div className="table-cell p-2">Orders ID</div>
//                 <div className="table-cell p-2">Orders Date</div>
//                 <div className="table-cell p-2">Orders Status</div>
//                 <div className="table-cell p-2">Orders Price</div>
//                 <div className="table-cell p-2">
//                   <span className="sr-only">Details</span>
//                 </div>
//               </div>
//             </div>

//             {/* Render each order */}
//             {orderList.map((orderItem) => (
//               <div
//                 key={orderItem._id}
//                 className="p-4 border rounded-md shadow-sm md:table-row"
//               >
//                 <div className="md:table-cell p-2 font-bold md:font-normal">
//                   <span className="block md:hidden">Order ID:</span>
//                   {orderItem?._id}
//                 </div>
//                 <div className="md:table-cell p-2">
//                   <span className="block md:hidden">Order Date:</span>
//                   {orderItem?.orderDate.split("T")[0]}
//                 </div>
//                 <div className="md:table-cell p-2">
//                   <span className="block md:hidden">Order Status:</span>
//                   <Badge
//                     className={`py-1 px-3 text-white ${
//                       orderItem?.orderStatus === "confirmed"
//                         ? "bg-green-500"
//                         : orderItem?.orderStatus === "rejected"
//                         ? "bg-red-600"
//                         : "bg-gray-500"
//                     }`}
//                   >
//                     {orderItem?.orderStatus}
//                   </Badge>
//                 </div>
//                 <div className="md:table-cell p-2">
//                   <span className="block md:hidden">Order Price:</span>
//                   {orderItem?.totalAmount} EGP
//                 </div>
//                 <div className="md:table-cell p-2">
//                   <Dialog
//                     open={openDetailsDialog}
//                     onOpenChange={() => {
//                       setOpenDetailsDialog(false);
//                       dispatch(resetOrderDetails());
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleFetchOrderDetails(orderItem?._id)}
//                       className="text-xs md:text-sm"
//                     >
//                       View Details
//                     </Button>
//                     <AdminOrderDetailsView orderDetails={orderDetails} />
//                   </Dialog>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No orders available.</p>
//         )}
//       </CardContent>
//     </Card>
//   ) : (
//     <Card>
//       <CardHeader>
//         <CardTitle>All Orders</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Orders ID</TableHead>
//               <TableHead>Orders Date</TableHead>
//               <TableHead>Orders Status</TableHead>
//               <TableHead>Orders Price</TableHead>
//               <TableHead>
//                 <span className="sr-only">Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orderList && orderList.length > 0
//               ? orderList.map((orderItem) => (
//                   <TableRow>
//                     <TableCell>{orderItem?._id}</TableCell>
//                     <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`py-1 px-3 ${
//                           orderItem?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderItem?.orderStatus === "rejected"
//                             ? "bg-red-600"
//                             : "bg-black"
//                         } `}
//                       >
//                         {orderItem?.orderStatus}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{orderItem?.totalAmount} EGP</TableCell>
//                     <TableCell>
//                       <Dialog
//                         open={openDetailsDialog}
//                         onOpenChange={() => {
//                           setOpenDetailsDialog(false);
//                           dispatch(resetOrderDetails());
//                         }}
//                       >
//                         <Button
//                           onClick={() =>
//                             handleFetchOrderDetails(orderItem?._id)
//                           }
//                         >
//                           View Details
//                         </Button>
//                         <AdminOrderDetailsView orderDetails={orderDetails} />
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }
// export default AdminOrdersView;


// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
// import { useNavigate } from "react-router-dom";

// function AdminOrdersView() {
//   const { orderList, isLoading, error } = useSelector(
//     (state) => state.adminOrder
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     // تحديث حالة الشاشة عند التغيير
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin());
//   }, [dispatch]);

//   if (isLoading) {
//     return <p>Loading orders...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   const sortedOrders = [...orderList].sort(
//     (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
//   );

//   return (
//     <Card className="p-4">
//       <CardHeader>
//         <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isMobile ? (
//           <div className="flex flex-col gap-4">
//             {sortedOrders.length > 0 ? (
//               sortedOrders.map((orderItem) => (
//                 <div
//                   key={orderItem._id}
//                   className="border rounded-lg shadow p-4 bg-white"
//                 >
//                   <p className="font-bold">
//                     Order ID: <span className="font-normal">{orderItem._id}</span>
//                   </p>
//                   <p>
//                     Order Date:{" "}
//                     <span className="font-normal">
//                       {orderItem.orderDate.split("T")[0]}
//                     </span>
//                   </p>
//                   <p>
//                     Order Status:{" "}
//                     <Badge
//                       className={`py-1 px-3 ${
//                         orderItem.orderStatus === "confirmed"
//                           ? "bg-green-500"
//                           : orderItem.orderStatus === "rejected"
//                           ? "bg-red-600"
//                           : "bg-black"
//                       } text-white`}
//                     >
//                       {orderItem.orderStatus}
//                     </Badge>
//                   </p>
//                   <p>
//                     Total Price:{" "}
//                     <span className="font-normal">
//                       {orderItem.totalAmount} EGP
//                     </span>
//                   </p>
//                   <Button
//                     className="mt-4"
//                     onClick={() => navigate(`/admin/orders/${orderItem._id}`)}
//                   >
//                     View Details
//                   </Button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No orders available.</p>
//             )}
//           </div>
//         ) : (
//           <table className="table-auto w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Orders ID</th>
//                 <th className="border p-2">Orders Date</th>
//                 <th className="border p-2">Orders Status</th>
//                 <th className="border p-2">Orders Price</th>
//                 <th className="border p-2">
//                   <span className="sr-only">Details</span>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedOrders.map((orderItem) => (
//                 <tr key={orderItem._id}>
//                   <td className="border p-2">{orderItem._id}</td>
//                   <td className="border p-2">
//                     {orderItem.orderDate.split("T")[0]}
//                   </td>
//                   <td className="border p-2">
//                     <Badge
//                       className={`py-1 px-3 ${
//                         orderItem.orderStatus === "confirmed"
//                           ? "bg-green-500"
//                           : orderItem.orderStatus === "rejected"
//                           ? "bg-red-600"
//                           : "bg-black"
//                       } text-white`}
//                     >
//                       {orderItem.orderStatus}
//                     </Badge>
//                   </td>
//                   <td className="border p-2">{orderItem.totalAmount} EGP</td>
//                   <td className="border p-2 text-center">
//                     <Button
//                       onClick={() =>
//                         navigate(`/admin/orders/${orderItem._id}`)
//                       }
//                     >
//                       View Details
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// export default AdminOrdersView;


import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { useNavigate } from "react-router-dom";

function AdminOrdersView() {
  const { orderList, isLoading, error } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [filter, setFilter] = useState("all"); // إضافة حالة الفلتر

  useEffect(() => {
    // تحديث حالة الشاشة عند التغيير
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // تصفية الطلبات بناءً على الفلتر
  const filteredOrders = orderList.filter((order) => {
    if (filter === "all") return true;
    return order.orderStatus === filter;
  });

  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {/* فلتر الحالة */}
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
            <option value="inProcess">inProcess</option>
            <option value="inShipping">inShipping</option>
            <option value="delivered">delivered</option>
          </select>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            {sortedOrders.length > 0 ? (
              sortedOrders.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="border rounded-lg shadow p-4 bg-white"
                >
                  <p className="font-bold">
                    Order ID: <span className="font-normal">{orderItem._id}</span>
                  </p>
                  <p>
                    Order Date:{" "}
                    <span className="font-normal">
                      {orderItem.orderDate.split("T")[0]}
                    </span>
                  </p>
                  <p>
                    Order Status:{" "}
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      } text-white`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </p>
                  <p>
                    Total Price:{" "}
                    <span className="font-normal">
                      {orderItem.totalAmount} EGP
                    </span>
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate(`/admin/orders/${orderItem._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No orders available.</p>
            )}
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Orders ID</th>
                <th className="border p-2">Orders Date</th>
                <th className="border p-2">Orders Status</th>
                <th className="border p-2">Orders Price</th>
                <th className="border p-2">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((orderItem) => (
                <tr key={orderItem._id}>
                  <td className="border p-2">{orderItem._id}</td>
                  <td className="border p-2">
                    {orderItem.orderDate.split("T")[0]}
                  </td>
                  <td className="border p-2">
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      } text-white`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </td>
                  <td className="border p-2">{orderItem.totalAmount} EGP</td>
                  <td className="border p-2 text-center">
                    <Button
                      onClick={() =>
                        navigate(`/admin/orders/${orderItem._id}`)
                      }
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
