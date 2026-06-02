import { Box } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import classes from "./AddToFavoritesStyle.module.css";
import { notifications } from "@mantine/notifications";
import API_CONFIG from "../../core/utils/apiConfig";
import { useEffect, useState } from "react";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;
export default function AddToFavorites({ id, setHandleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);
  

  useEffect(() => {
    // check لو المنتج موجود في favorites
    async function checkProductInFavorites() {
      try {
        // هات اليوزر
        const getUser = JSON.parse(localStorage.getItem("currentUser"));

        // لو مفيش يوزر
        if (!getUser) return;

        // هات بيانات اليوزر
        const userRes = await fetch(
          API_CONFIG.mainUrl + endpointForUsers + getUser,
        );

        const user = await userRes.json();

        // هات favorites
        const items = user?.favorites || [];

        // check هل المنتج موجود
        const isExist = items.some((item) => item.id === id);

        // خزّن الحالة
        setIsFavorite(isExist);
      } catch (error) {
        console.log(error);
      }
    }

    // تشغيل الفنكشن أول ما الصفحة تحمل
    checkProductInFavorites();
  }, [id]);

  // add / remove favorites
  async function addToFavorites(productId) {
    try {
      // هات اليوزر
      const getUser = JSON.parse(localStorage.getItem("currentUser"));

      // لو مش عامل login
      if (!getUser) {
        return notifications.show({
          message: "Please log in first",
          position: "top-right",
          color: "orange",
        });
      }

      // هات بيانات اليوزر
      const userRes = await fetch(
        API_CONFIG.mainUrl + endpointForUsers + getUser,
      );

      const user = await userRes.json();

      // هات المنتج
      const productRes = await fetch(
        API_CONFIG.mainUrl +
          API_CONFIG.endpoints.products.allProducts +
          "/" +
          productId,
      );

      const product = await productRes.json();

      // اعمل favorites لو مش موجودة
      user.favorites = user.favorites || [];

      // check هل المنتج موجود
      const index = user.favorites.findIndex((item) => item.id === product.id);

      // لو موجود احذفه
      if (index !== -1) {
        user.favorites.splice(index, 1);
        // غيّر الايقون
        setIsFavorite(false);

        notifications.show({
          message: "Item removed from favorites.",
          position: "top-right",
          color: "red",
        });
      } else {
        // ضيف المنتج
        user.favorites.push(product);

        // غيّر الايقون
        setIsFavorite(true);

        notifications.show({
          message: "Item added to favorites.",
          position: "top-right",
          color: "green",
        });
      }


      // update user
      await fetch(API_CONFIG.mainUrl + endpointForUsers + getUser, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      });

      // for Handle Favorite page to fetch new favorites from user after remove or add  
      const res = await fetch(API_CONFIG.mainUrl + endpointForUsers + getUser);
      const data= await res.json()
      setHandleFavorite(data.favorites.length)

    } catch (error) {
      console.log(error);
    }
  }

    // to check if the screen is mobile or not for change the aspect ratio of the video review

   const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 577);
    };

    handleResize(); // أول مرة
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box onClick={() => addToFavorites(id)} className={classes.btnFavorites}>
      {isFavorite ? (
        <IconHeartFilled size={ isMobile ? 20 : 30} color="red" />
      ) : (
        <IconHeart size={isMobile ? 20 : 30} color="red" />
      )}
    </Box>
  );
}
