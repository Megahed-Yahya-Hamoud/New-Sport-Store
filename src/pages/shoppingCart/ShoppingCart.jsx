import { Box, Text } from "@mantine/core";
import classes from "./ShoppingCartStyle.module.css";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import LogoEmpty from "./components/logoEmpty/LogoEmpty";
import ProductsCart from "./components/productsCart/ProductsCart";
import { useEffect, useState } from "react";
import API_CONFIG from "../../core/utils/apiConfig";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function ShoppingCart() {
  const [length, setLength] = useState([]);
  const [newRefresh, setNewRefresh] = useState(false);
  const getUser = JSON.parse(localStorage.getItem("currentUser"));
// لو مفيش items في ال cart هعرض صفحة فاضية فيها لوجو بس من غير search ولا pagination
  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForUsers + getUser)
      .then((res) => res.json())
      .then((data) => setLength(data.cart.items));
  }, [getUser, newRefresh]);

  return (
    <Box>
      <Box className={classes.up}>
        <Box className={classes.parent}>
          <Box className={classes.boxHeader}>
            <Text className={classes.title}>Shopping Cart</Text>
            <Text className={classes.counter}>
              {"("} {length.length} items {")"}
            </Text>
          </Box>
          {length.length <= 0 ? (
            <>{/* <LogoEmpty /> */}</>
          ) : (
            <>
              <Box display={""} className={classes.boxLink}>
                <Link to={"/"} className={classes.btnShopping}>
                  <IconChevronLeft
                    style={{ width: "20px", height: "20px" }}
                    className={classes.arrow}
                  />
                  <Text className={classes.TextBtn}>Go Shopping</Text>
                </Link>
              </Box>
              <Box display={""} className={classes.twoBoxLink}>
                <Link to={"/"} className={classes.btnShopping}>
                  <IconChevronLeft
                    style={{ width: "20px", height: "20px" }}
                    className={classes.arrow}
                  />
                  <Text className={classes.TextBtn}>Go Shopping</Text>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Box>
        {length.length <= 0 ? (
          <>
            <LogoEmpty />
          </>
        ) : (
          <>
            <ProductsCart setNewRefresh={setNewRefresh} />
          </>
        )}
      </Box>
    </Box>
  );
}
