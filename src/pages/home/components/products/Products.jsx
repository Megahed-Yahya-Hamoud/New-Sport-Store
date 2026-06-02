import { Box, Button, Menu } from "@mantine/core";
import classes from "./ProductsStyle.module.css";
import { Link } from "react-router-dom";
import {
  IconDotsVertical,
  IconHeart,
  IconShoppingCart,
} from "@tabler/icons-react";

export default function Products( products ) {
  return (
    <Box className={classes.products}>
      {products.map((product) => (
        <Box key={product.id} className={classes.parentCard}>
          <Box className={classes.card}>
            <Image className={classes.imageCard} src={product.image} />
            <Box className={classes.icons}>
              <Box className={classes.icons}>
                <IconShoppingCart
                  onClick={() => console.log("")}
                  className={classes.icon}
                />
                <IconHeart
                  onClick={() => console.log("")}
                  className={classes.iconTwo}
                />
              </Box>
            </Box>
            <Box className={classes.toggle}>
              <Menu
                transitionProps={{
                  transition: "rotate-right",
                  duration: 150,
                }}
                shadow="md"
                width={200}
              >
                <Menu.Target>
                  <Button className={classes.dots}>
                    <IconDotsVertical />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown
                  style={{
                    border: "0px",
                    boxShadow: "none",
                  }}
                  w={"fit-content"}
                  bg={"#ffffff00"}
                  ml={5}
                >
                  <Menu.Item
                    w={"fit-content"}
                    bg={"#f0f8ff00"}
                    m={5}
                    // onClick={() => addToCart(product.id)}
                    leftSection={
                      <IconShoppingCart className={classes.iconDotsOne} />
                    }
                  ></Menu.Item>
                  <Menu.Item
                    w={"fit-content"}
                    bg={"#f0f8ff00"}
                    m={5}
                    // onClick={() => addToFavorites(product.id) }
                    leftSection={<IconHeart className={classes.iconDotsTwo} />}
                  ></Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          </Box>
          <Box className={classes.details}>
            <Link to={`/products/${product.id}`} className={classes.text}>
              {product.name}
            </Link>
            <Text fz={20} fw={700} c={"red"} className={classes.price}>
              {product.price}$
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
