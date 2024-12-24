import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          // عرض عمودي للأجهزة المحمولة
          <div className="space-y-4">
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <div
                  key={orderItem?._id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">Order ID:</span>
                    <span>{orderItem?._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{orderItem?.orderDate.split("T")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      } text-white`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span>{orderItem?.totalAmount} EGP</span>
                  </div>
                  <div className="mt-2">
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        View Details
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No orders found.
              </p>
            )}
          </div>
        ) : (
          // عرض جدولي للأجهزة الكبيرة
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Orders ID</TableHead>
                  <TableHead>Orders Date</TableHead>
                  <TableHead>Orders Status</TableHead>
                  <TableHead>Orders Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList && orderList.length > 0
                  ? orderList.map((orderItem) => (
                      <TableRow key={orderItem?._id}>
                        <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>
                          {orderItem?.orderDate.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`py-1 px-3 ${
                              orderItem?.orderStatus === "confirmed"
                                ? "bg-green-500"
                                : orderItem?.orderStatus === "rejected"
                                ? "bg-red-600"
                                : "bg-black"
                            } text-white`}
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{orderItem?.totalAmount} EGP</TableCell>
                        <TableCell>
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false);
                              dispatch(resetOrderDetails());
                            }}
                          >
                            <Button
                              onClick={() =>
                                handleFetchOrderDetails(orderItem?._id)
                              }
                            >
                              View Details
                            </Button>
                            <ShoppingOrderDetailsView
                              orderDetails={orderDetails}
                            />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
