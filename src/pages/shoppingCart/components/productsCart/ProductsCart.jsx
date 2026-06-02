/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Checkbox, Image, Text } from "@mantine/core";
import classes from "./ProductsCart.module.css";
import { useEffect, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import Quantity from "./components/quantity/Quantity";
import Summary from "./components/summary/Summary";
import { Link } from "react-router-dom";
import DeleteCartItem from "./components/deleteCartItem/DeleteCartItem";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function ProductsCart({ setNewRefresh }) {
  const getUser = JSON.parse(localStorage.getItem("currentUser"));

  const [products, setProducts] = useState([]);
  const [cartQty, setCartQty] = useState({});
  const [refresh, setRefresh] = useState(false);

  // ================= Fetch Cart =================
  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForUsers + getUser)
      .then((res) => res.json())
      .then((data) => {
        // كل العناصر تظهر في الـ UI
        const updatedItems =
          data?.cart?.items?.map((item) => ({
            ...item,
            isChecked: item.isChecked !== undefined ? item.isChecked : true,
          })) || [];

        setProducts(updatedItems);
        const initialQty = {};
        updatedItems.forEach((item) => {
          initialQty[item.id] = 1;
        });
        setCartQty(initialQty);
      });

    setNewRefresh((prev) => !prev);
  }, [refresh]);

  // ================= Qty Handler =================
  const handleQtyChange = (id, qty) => {
    // تحديث الكمية في الـ state
    setCartQty((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  // ================= Checkbox Handler =================
  const handleCheckChange = async (id, checked) => {
    // تحديث الـ state
    const updatedProducts = products.map((item) =>
      item.id === id
        ? {
            ...item,
            isChecked: checked,
          }
        : item,
    );

    setProducts(updatedProducts);

    // العناصر اللي checked فقط
    const cartItems = updatedProducts.filter((item) => item.isChecked);

    // حساب التوتال
    const total = cartItems.reduce((acc, product) => {
      const qty = cartQty[product.id] || 1;

      return acc + Number(product.price) * Number(qty);
    }, 0);

    // update api
    await fetch(`${API_CONFIG.mainUrl}${endpointForUsers}${getUser}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: {
          items: cartItems,
          total_price: total,
        },
      }),
    });
  };

  // ================= Final Total =================
  const finalTotal = products.reduce((acc, product) => {
    if (!product.isChecked) return acc;
    const qty = cartQty[product.id] || 1;
    return acc + Number(product.price) * Number(qty);
  }, 0);

  // ================= Update API =================
  useEffect(() => {
    if (products.length === 0) return;

    const checkedProducts = products.filter((item) => item.isChecked);

    fetch(`${API_CONFIG.mainUrl}${endpointForUsers}${getUser}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: {
          items: checkedProducts,
          total_price: finalTotal,
        },
      }),
    });
  }, [finalTotal]);

  return (
    <Box mt={50} mb={20} className={classes.parent}>
      {/* ================= Products ================= */}
      <Box className={classes.containerProducts}>
        {products.map((ele) => (
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
                checked={ele.isChecked}
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
                    price={ele.price}
                    quantity={ele.quantity}
                    onQtyChange={(qty) => handleQtyChange(ele.id, qty)}
                  />

                  <DeleteCartItem
                    id={ele.id}
                    products={products}
                    setProducts={setProducts}
                    setRefresh={setRefresh}
                    cartQty={cartQty}
                    getUser={getUser}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* ================= Summary ================= */}
      <Summary finalTotal={finalTotal} />
    </Box>
  );
}
