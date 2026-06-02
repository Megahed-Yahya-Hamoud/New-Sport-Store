import { Box, Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import classes from "./AddToCartStyle.module.css";
import API_CONFIG from "../../core/utils/apiConfig";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function AddToCart({ id }) {
  const [titleBtn, setTitleBtn] = useState("Add to Cart");
  const [colorBtn, setColorBtn] = useState("black");

  useEffect(() => {
    // function بتشيك هل المنتج موجود في الكارت ولا لا
    async function checkProductInCart() {
      try {
        // هات الـ user id من localStorage
        const getUser = JSON.parse(localStorage.getItem("currentUser"));

        // لو مفيش user اوقف
        if (!getUser) return;

        // هات بيانات اليوزر
        const userRes = await fetch(
          API_CONFIG.mainUrl + endpointForUsers + getUser,
        );

        // حول البيانات لـ json
        const user = await userRes.json();

        // هات العناصر الموجودة في الكارت
        const items = user?.cart?.items || [];

        // شوف هل المنتج الحالي موجود
        const isExist = items.some((item) => item.id === id);

        // لو المنتج موجود
        if (isExist) {
          // غير شكل الزر
          setTitleBtn("Remove from cart");
          setColorBtn("red");
        } else {
          // لو المنتج مش موجود
          setTitleBtn("Add to Cart");
          setColorBtn("black");
        }
      } catch (error) {
        // اطبع الخطأ
        console.log(error);
      }
    }

    // تشغيل الفنكشن أول ما الصفحة تحمل
    checkProductInCart();
  }, [id]);

  // function إضافة أو حذف المنتج من الكارت
  async function addToCart(productId) {
    try {
      // هات الـ user id من localStorage
      const getUser = JSON.parse(localStorage.getItem("currentUser"));

      // لو المستخدم مش عامل login
      if (!getUser) {
        // اظهار notification
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

      // تحويل البيانات لـ json
      const user = await userRes.json();

      // هات بيانات المنتج
      const productRes = await fetch(
        API_CONFIG.mainUrl +
          API_CONFIG.endpoints.products.allProducts +
          "/" +
          productId,
      );

      // تحويل بيانات المنتج لـ json
      const product = await productRes.json();

      // لو الكارت مش موجود اعمله
      user.cart = user.cart || {
        items: [],
        total_price: 0,
      };

      // لو items مش موجودة اعملها array
      user.cart.items = user.cart.items || [];

      // شوف المنتج موجود ولا لا
      const index = user.cart.items.findIndex((item) => item.id === product.id);

      // لو المنتج موجود
      if (index !== -1) {
        // احذف المنتج
        user.cart.items.splice(index, 1);

        // اطرح السعر من total price
        user.cart.total_price -= product.price || 0;

        // غير شكل الزر
        setTitleBtn("Add to Cart");
        setColorBtn("black");
        notifications.show({
          message: "Item removed from cart.",
          position: "top-right",
          color: "red",
        });
      } else {
        // لو المنتج مش موجود ضيفه
        user.cart.items.push(product);

        // زود السعر
        user.cart.total_price += product.price || 0;

        // غير شكل الزر
        setTitleBtn("Remove from cart");
        setColorBtn("red");
        notifications.show({
          message: "Item added to cart.",
          position: "top-right",
          color: "green",
        });
      }

      // update بيانات اليوزر
      await fetch(API_CONFIG.mainUrl + endpointForUsers + getUser, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        // ابعت البيانات الجديدة
        body: JSON.stringify(user),
      });
    } catch (error) {
      // اظهار الخطأ
      console.log(error);
    }
  }

  return (
    <Box
      onClick={() => {
        addToCart(id);
      }}
      className={classes.btnCart}
    >
      <Button bg={colorBtn} className={classes.btn}>
        <IconShoppingCart className={classes.iconCart} style={{ marginRight: "10px" }} />
        {titleBtn}
      </Button>
    </Box>
  );
}
