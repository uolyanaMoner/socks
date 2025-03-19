import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

function AdminOrdersView() {
  const { orderList, isLoading, error } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [filter, setFilter] = useState("all");
  const [editStatus, setEditStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // إضافة البحث
  const [selectedStatus, setSelectedStatus] = useState(""); // لحفظ الحالة المختارة
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleChangeStatus = (orderId, newStatus) => {
    setSelectedStatus(newStatus); // تحديث الحالة المختارة
    handleUpdateStatus(orderId, newStatus);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await dispatch(
        updateOrderStatus({
          id: orderId,
          orderStatus: newStatus,
        })
      );

      if (response?.payload?.success) {
        await dispatch(getAllOrdersForAdmin()); // تحديث بيانات الطلبات بعد التحديث
        toast({
          title: `تم تغيير الحالة إلى ${newStatus}`,
          style: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "20px",
          },
        });
      } else {
        toast({
          title: "فشل في تحديث الحالة",
          style: {
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "20px",
          },
        });
      }
    } catch (error) {
      toast({
        title: "حدث خطأ أثناء التحديث",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "20px",
        },
      });
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredOrders = orderList
    .filter((order) => filter === "all" || order.orderStatus === filter)
    .filter((order) => {
      const customerName = order?.addressInfo?.fullName || "";
      const phoneNumber = order.addressInfo?.phone || "";
      return (
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phoneNumber.includes(searchTerm)
      );
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
      <div className="mb-4 gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍Search by name or phone "
            className="p-2 border border-gray-300 rounded w-full sm:w-1/3 "
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
            <option value="inProcess">In Process</option>
            <option value="inShipping">In Shipping</option>
            <option value="delivered">Delivered</option>
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
                    Order ID:{" "}
                    <span className="font-normal">{orderItem._id}</span>
                  </p>
                  <p>
                    Order Date:{" "}
                    <span className="font-normal">
                      {orderItem.orderDate.split("T")[0]}
                    </span>
                  </p>

                  <p>
                    Order Time:{" "}
                    <span className="font-normal">
                      {new Date(orderItem.orderDate).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </p>
                  <p>
                    Order Status:{" "}
                    {editStatus === orderItem._id ? (
                      <select
                        value={selectedStatus || orderItem.orderStatus}
                        onChange={(e) =>
                          handleChangeStatus(orderItem._id, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded w-full"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                        <option value="inProcess">In Process</option>
                        <option value="inShipping">In Shipping</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <Badge
                        onClick={() => setEditStatus(orderItem._id)}
                        className={`py-1 px-3 ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        } text-white cursor-pointer`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    )}
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
                <th className="border p-2">Orders Time</th>
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
                    {new Date(orderItem.orderDate).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border p-2">
                    {editStatus === orderItem._id ? (
                      <select
                        value={selectedStatus || orderItem.orderStatus}
                        onChange={(e) =>
                          handleChangeStatus(orderItem._id, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded w-full"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                        <option value="inProcess">In Process</option>
                        <option value="inShipping">In Shipping</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <Badge
                        onClick={() => setEditStatus(orderItem._id)}
                        className={`py-1 px-3 ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        } text-white cursor-pointer`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    )}
                  </td>
                  <td className="border p-2">{orderItem.totalAmount} EGP</td>
                  <td className="border p-2 text-center">
                    <Button
                      onClick={() => navigate(`/admin/orders/${orderItem._id}`)}
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
