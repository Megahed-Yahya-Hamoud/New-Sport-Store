import classes from "./DeleteCartItem.module.css";
import { Box, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import API_CONFIG from "../../../../../../core/utils/apiConfig";
import { notifications } from "@mantine/notifications";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function DeleteCartItem({
  id,
  products,
  setProducts,
  setRefresh,
  cartQty,
  checkedItems,
  getUser,
}) {
  const deleteItemHandler = async () => {
    try {
      // حذف العنصر
      const updatedProducts = products.filter((item) => item.id !== id);

      // تحديث الـ UI
      setProducts(updatedProducts);

      // حساب التوتال الجديد
      const updatedTotal = updatedProducts.reduce((acc, product) => {
        if (!checkedItems[product.id]) return acc;
        const qty = cartQty[product.id] || 1;

        return acc + Number(product.price) * Number(qty);
      }, 0);

      // تحديث الـ API
      await fetch(`${API_CONFIG.mainUrl}${endpointForUsers}${getUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: {
            items: updatedProducts,
            total_price: updatedTotal,
          },
        }),
      });

      // تشغيل fetch جديد
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("Delete Error:", error);
    }

    notifications.show({
      message: "Item removed from cart.",
      position: "top-right",
      color: "red",
    });
  };

  return (
    <Box
      className={classes.remove}
      onClick={deleteItemHandler}
      style={{ cursor: "pointer" }}
    >
      <IconTrash className={classes.iconTrash} />

      <Text className={classes.textRemove}>Remove</Text>
    </Box>
  );
}
