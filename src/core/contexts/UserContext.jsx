/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import API_CONFIG from "../utils/apiConfig";
import { notifications } from "@mantine/notifications";

export const UserContext = createContext(null);

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track the current user ID
  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  });

  const fetchUserData = async (userId) => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(API_CONFIG.mainUrl + endpointForUsers + userId);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!currentUserId) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(API_CONFIG.mainUrl + endpointForUsers + currentUserId);
        if (res.ok && active) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(load, 0);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [currentUserId]);

  const updateServer = async (updatedUser) => {
    try {
      const res = await fetch(API_CONFIG.mainUrl + endpointForUsers + currentUserId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });
      if (!res.ok) {
        throw new Error("Failed to save changes to database");
      }
    } catch (err) {
      console.error("Failed to sync with server:", err);
      // Re-fetch data from server to rollback state in case of failure
      fetchUserData(currentUserId);
      notifications.show({
        message: "Failed to sync changes with server. Reverting state.",
        color: "red"
      });
    }
  };

  const addToCart = async (product) => {
    if (!currentUserId) {
      notifications.show({
        message: "Please log in first",
        position: "top-right",
        color: "orange",
      });
      return;
    }
    if (!user) return;

    // Create deep copy of user cart to avoid mutation issues
    const updatedUser = {
      ...user,
      cart: {
        items: user.cart?.items ? [...user.cart.items] : [],
        total_price: user.cart?.total_price || 0
      }
    };

    const index = updatedUser.cart.items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const item = updatedUser.cart.items[index];
      if (item.isChecked === false) {
        item.isChecked = true;
        const itemQty = item.cartQuantity || 1;
        updatedUser.cart.total_price += (product.price || 0) * itemQty;
        notifications.show({
          message: "Item added to cart.",
          position: "top-right",
          color: "green",
        });
      } else {
        const itemQty = item.cartQuantity || 1;
        updatedUser.cart.items.splice(index, 1);
        updatedUser.cart.total_price = Math.max(0, updatedUser.cart.total_price - ((product.price || 0) * itemQty));
        notifications.show({
          message: "Item removed from cart.",
          position: "top-right",
          color: "red",
        });
      }
    } else {
      updatedUser.cart.items.push({
        ...product,
        cartQuantity: 1,
        isChecked: true
      });
      updatedUser.cart.total_price += (product.price || 0);
      notifications.show({
        message: "Item added to cart.",
        position: "top-right",
        color: "green",
      });
    }

    // Optimistically update local state
    setUser(updatedUser);

    // Sync to DB
    await updateServer(updatedUser);
  };

  const toggleFavorite = async (product) => {
    if (!currentUserId) {
      notifications.show({
        message: "Please log in first",
        position: "top-right",
        color: "orange",
      });
      return;
    }
    if (!user) return;

    const updatedUser = {
      ...user,
      favorites: user.favorites ? [...user.favorites] : []
    };

    const index = updatedUser.favorites.findIndex(item => item.id === product.id);
    if (index !== -1) {
      updatedUser.favorites.splice(index, 1);
      notifications.show({
        message: "Item removed from favorites.",
        position: "top-right",
        color: "red",
      });
    } else {
      updatedUser.favorites.push(product);
      notifications.show({
        message: "Item added to favorites.",
        position: "top-right",
        color: "green",
      });
    }

    // Optimistically update local state
    setUser(updatedUser);

    // Sync to DB
    await updateServer(updatedUser);
  };

  const loginUser = (userId) => {
    localStorage.setItem("currentUser", JSON.stringify(userId));
    setCurrentUserId(userId);
  };

  const logoutUser = () => {
    localStorage.clear();
    setCurrentUserId(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, fetchUserData: () => fetchUserData(currentUserId), setUser, addToCart, toggleFavorite, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
