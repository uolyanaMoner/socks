import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllPartitionProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "./product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "./product-details";
import { useToast } from "@/components/ui/use-toast";

const PartitionProducts = () => {
  const dispatch = useDispatch();
  const { partitionId } = useParams();
  const { productList, loading, error, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
  const { toast } = useToast();

  useEffect(() => {
    console.log("📌 Fetching all products...");
    dispatch(fetchAllPartitionProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("🛒 Current Products in State:", productList);
  }, [productList]);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCard(getCurrentProductId) {
    const userId = user?.id || localStorage.getItem("guestUserId");
    if (!userId) {
      const generatedUserId = `guest-${Date.now()}`;
      localStorage.setItem("guestUserId", generatedUserId);
    }
    if (userId) {
      dispatch(
        addToCart({ userId, productId: getCurrentProductId, quantity: 1 })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(userId));
          toast({
            title: "Product is added to cart",
            style: {
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "20px",
            },
          });
        }
      });
    } else {
      toast({
        title: "Unable to get User ID",
        variant: "destructive",
        style: {
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "20px",
        },
      });
    }
  }

  const filteredProducts =
    productList?.filter((product) => product.partitionId === partitionId) || [];

  if (loading)
    return (
      <p style={{ fontSize: "18px", color: "#777", marginTop: "20px" }}>
        Loading partition products...
      </p>
    );

  if (error)
    return (
      <p style={{ fontSize: "18px", color: "#d9534f", marginTop: "20px" }}>
        Error fetching partition products.
      </p>
    );

  if (filteredProducts.length === 0)
    return (
      <p style={{ fontSize: "18px", color: "#777", marginTop: "20px" }}>
        No products found in this partition.
      </p>
    );

  return (
    <section className="py-12">
      <div
        className="container mx-auto px-4"
      >
        <h2
          className="text-3xl font-bold text-center mb-8"
        >
          Products in this Partition
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCard={handleAddToCard}
            />
          ))}
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </section>
  );
};

export default PartitionProducts;
