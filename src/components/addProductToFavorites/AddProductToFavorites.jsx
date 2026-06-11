import { Box } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import classes from "./AddProductToFavoritesStyle.module.css";
import API_CONFIG from "../../core/utils/apiConfig";
import { useContext } from "react";
import { UserContext } from "../../core/contexts/UserContext";

export default function AddProductToFavorites({ id, product, setHandleFavorite }) {
  const { user, toggleFavorite } = useContext(UserContext);

  const items = user?.favorites || [];
  const isFavorite = items.some((item) => item.id === id);

  async function handleFavoriteClick(e) {
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
    await toggleFavorite(productObj);
    if (setHandleFavorite && user) {
      const newFavorites = user.favorites || [];
      const isCurrentlyFav = newFavorites.some(item => item.id === id);
      const expectedLength = isCurrentlyFav ? newFavorites.length - 1 : newFavorites.length + 1;
      setHandleFavorite(expectedLength);
    }
  }

  return (
    <Box onClick={handleFavoriteClick} className={classes.btnFavorites}>
      {isFavorite ? (
        <IconHeartFilled size={27} color="red" />
      ) : (
        <IconHeart size={27} color="red" />
      )}
    </Box>
  );
}
