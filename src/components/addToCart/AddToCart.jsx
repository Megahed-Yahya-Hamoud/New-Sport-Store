import { Box, Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import classes from "./AddToCartStyle.module.css";
import API_CONFIG from "../../core/utils/apiConfig";
import { useContext } from "react";
import { UserContext } from "../../core/contexts/UserContext";

export default function AddToCart({ id, product }) {
  const { user, addToCart: addToCartContext } = useContext(UserContext);

  const items = user?.cart?.items || [];
  const isExist = items.some((item) => item.id === id && item.isChecked !== false);

  const titleBtn = isExist ? "Remove from cart" : "Add to Cart";
  const colorBtn = isExist ? "red" : "black";

  async function handleCartClick(e) {
    e.stopPropagation();
    let productObj = product;
    if (!productObj) {
      try {
        const productRes = await fetch(
          API_CONFIG.mainUrl +
            API_CONFIG.endpoints.products.allProducts +
            "/" +
            id
        );
        productObj = await productRes.json();
      } catch (error) {
        console.error("Failed to fetch product:", error);
        return;
      }
    }
    addToCartContext(productObj);
  }

  return (
    <Box
      onClick={handleCartClick}
      className={classes.btnCart}
    >
      <Button bg={colorBtn} className={classes.btn}>
        <IconShoppingCart className={classes.iconCart} style={{ marginRight: "10px" }} />
        {titleBtn}
      </Button>
    </Box>
  );
}
