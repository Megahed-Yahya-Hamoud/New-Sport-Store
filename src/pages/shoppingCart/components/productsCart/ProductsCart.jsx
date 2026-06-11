/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Checkbox, Image, Text } from "@mantine/core";
import classes from "./ProductsCart.module.css";
import { useContext } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import Quantity from "./components/quantity/Quantity";
import Summary from "./components/summary/Summary";
import { Link } from "react-router-dom";
import DeleteCartItem from "./components/deleteCartItem/DeleteCartItem";
import Loading from "../../../../components/loading/Loading";
import { UserContext } from "../../../../core/contexts/UserContext";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function ProductsCart() {
  const { user, setUser } = useContext(UserContext);
  
  // Directly consume products from UserContext
  const products = user?.cart?.items || [];

  // ================= State & Server Sync Helper =================
  const updateCartStateAndServer = async (updatedItems) => {
    if (!user) return;
    
    // Calculate total price based on checked items * quantity
    const total = updatedItems.reduce((acc, item) => {
      if (item.isChecked === false) return acc;
      return acc + Number(item.price) * (item.cartQuantity || 1);
    }, 0);

    const updatedUser = {
      ...user,
      cart: {
        items: updatedItems,
        total_price: total,
      },
    };

    // Update context instantly (Optimistic UI)
    setUser(updatedUser);

    // Sync to database
    try {
      await fetch(`${API_CONFIG.mainUrl}${endpointForUsers}${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: {
            items: updatedItems,
            total_price: total,
          },
        }),
      });
    } catch (error) {
      console.error("Failed to sync cart change:", error);
    }
  };

  // ================= Qty Handler =================
  const handleQtyChange = (id, qty) => {
    const updatedItems = products.map((item) =>
      item.id === id ? { ...item, cartQuantity: qty } : item
    );
    updateCartStateAndServer(updatedItems);
  };

  // ================= Checkbox Handler =================
  const handleCheckChange = (id, checked) => {
    const updatedItems = products.map((item) =>
      item.id === id ? { ...item, isChecked: checked } : item
    );
    updateCartStateAndServer(updatedItems);
  };

  // ================= Final Total =================
  const finalTotal = products.reduce((acc, product) => {
    if (product.isChecked === false) return acc;
    return acc + Number(product.price) * (product.cartQuantity || 1);
  }, 0);

  return (
    <Box display={products.length === 0 ? "grid" : ""} mt={50} mb={20} className={classes.parent}>
      {/* ================= Products ================= */}
      <Box className={classes.containerProducts}>
        {products.length === 0 ? (
          <Box display={"grid"} style={{ alignContent: "center", alignItems: "start" }} h={"50vh"}>
            <Loading />
            <br />
          </Box>
        ) : (
          products.map((ele) => (
            <Box key={ele.id} className={classes.card}>
              {/* ================= Checkbox ================= */}
              <Box
                mb={10}
                mt={10}
                display={"flex"}
                style={{
                  justifyContent: "end",
                }}
              >
                <Checkbox
                  color="black"
                  checked={ele.isChecked !== false}
                  onChange={(e) => handleCheckChange(ele.id, e.target.checked)}
                />
              </Box>

              {/* ================= Product Card ================= */}
              <Box className={classes.productsCard}>
                <Image src={ele.image} w={180} h={180} />

                <Box className={classes.productData}>
                  <Link
                    to={`/products/${ele.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Text className={classes.productTitle}>{ele.name}</Text>
                  </Link>

                  <Text className={classes.details}>
                    Color: {ele.colors?.[0]}
                  </Text>
                  <Text className={classes.details}>Size: {ele.size?.[0]}</Text>

                  <Text className={classes.details}>Price: ${ele.price}</Text>

                  <Text className={classes.stock}>In Stock</Text>

                  {/* ================= Quantity ================= */}
                  <Box
                    display={"flex"}
                    style={{
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "end",
                    }}
                  >
                    <Quantity
                      count={ele.cartQuantity || 1}
                      stock={ele.quantity}
                      price={ele.price}
                      onQtyChange={(qty) => handleQtyChange(ele.id, qty)}
                    />

                    <DeleteCartItem id={ele.id} />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* ================= Summary ================= */}
      <Summary finalTotal={finalTotal} />
    </Box>
  );
}
