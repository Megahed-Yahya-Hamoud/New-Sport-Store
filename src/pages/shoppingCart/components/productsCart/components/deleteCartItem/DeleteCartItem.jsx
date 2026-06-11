import classes from "./DeleteCartItem.module.css";
import { Box, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import API_CONFIG from "../../../../../../core/utils/apiConfig";
import { notifications } from "@mantine/notifications";
import { useContext } from "react";
import { UserContext } from "../../../../../../core/contexts/UserContext";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function DeleteCartItem({ id }) {
  const { user, setUser } = useContext(UserContext);

  const deleteItemHandler = async (e) => {
    e.stopPropagation();
    try {
      if (!user) return;

      const updatedItems = user.cart.items.filter((item) => item.id !== id);

      const updatedTotal = updatedItems.reduce((acc, item) => {
        if (item.isChecked === false) return acc;
        return acc + Number(item.price) * (item.cartQuantity || 1);
      }, 0);

      const updatedUser = {
        ...user,
        cart: {
          items: updatedItems,
          total_price: updatedTotal,
        },
      };

      // Update local state instantly (Optimistic UI)
      setUser(updatedUser);

      // Sync changes in the background
      await fetch(`${API_CONFIG.mainUrl}${endpointForUsers}${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      notifications.show({
        message: "Item removed from cart.",
        position: "top-right",
        color: "red",
      });
    } catch (error) {
      console.log("Delete Error:", error);
    }
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
