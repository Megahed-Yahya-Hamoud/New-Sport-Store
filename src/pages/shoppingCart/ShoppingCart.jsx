import { Box, Text } from "@mantine/core";
import classes from "./ShoppingCartStyle.module.css";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import LogoEmpty from "./components/logoEmpty/LogoEmpty";
import ProductsCart from "./components/productsCart/ProductsCart";
import { useContext } from "react";
import { UserContext } from "../../core/contexts/UserContext";

export default function ShoppingCart() {
  const { user } = useContext(UserContext);
  const length = user?.cart?.items || [];

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
            <ProductsCart />
          </>
        )}
      </Box>
    </Box>
  );
}
