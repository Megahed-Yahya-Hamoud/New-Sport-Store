import { Box, Image, Text } from "@mantine/core";
import classes from "./ProductsPay.module.css";
import { IconArrowLeft, IconBuildingStore } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import Loading from "../../../../components/loading/Loading";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function ProductsPay() {
  const getUser = JSON.parse(localStorage.getItem("currentUser"));

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForUsers + getUser)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.cart.items);
        setTotalPrice(data.cart.total_price);
      });
  }, []);

  function showDiscount(discount, price) {
    if (discount) {
      let percentage = (discount / 100) * price;

      const newPrice = price - percentage;
      const newDiscount = Math.round(newPrice);

      return products.length > 1 ? (
        <Box className={classes.containerPrice}>
          <Text fw={500} fz={14}>
            ${newDiscount}.00
          </Text>
        </Box>
      ) : (
        <Box className={classes.containerPrice}>
          <Text className={classes.singleProductPrice} fw={600}>
            ${newDiscount}.00
          </Text>
        </Box>
      );
    } else {
      return products.length > 1 ? (
        <Box className={classes.containerPrice}>
          <Text fw={500} fz={14}>
            ${price}.00
          </Text>
        </Box>
      ) : (
        <Box className={classes.containerPrice}>
          <Text className={classes.singleProductPrice} fw={600}>
            ${price}.00
          </Text>
        </Box>
      );
    }
  }

  return (
    <Box>
      <Box pl={30} pt={50} className={classes.secondContainerBack}>
        <Link to={"/shopping-cart"} className={classes.btnBack}>
          <IconArrowLeft className={classes.arrow} />
          <Box className={classes.boxIcon}>
            <IconBuildingStore className={classes.store} />
            <Text className={classes.back}>Back</Text>
          </Box>
        </Link>
        <Box className={classes.title}>TEST MODE</Box>
      </Box>

      <Box className={classes.parent}>
        <Box className={classes.containerProducts}>
          <Box className={classes.firstContainerBack}>
            <Link to={"/shopping-cart"} className={classes.btnBack}>
              <IconArrowLeft className={classes.arrow} />
              <Box className={classes.boxIcon}>
                <IconBuildingStore className={classes.store} />
                <Text className={classes.back}>Back</Text>
              </Box>
            </Link>
            <Box className={classes.title}>TEST MODE</Box>
          </Box>
          {products.length > 1 ? (
            <Box className={classes.containerBtnBack} mt={"2rem"}>
              <Text ta={"start"} fw={500} c={"hsl(0deg 0% 10% / 60%)"}>
                Pay
              </Text>
              <Text fw={600} fz={36}>
                ${totalPrice}.00
              </Text>
            </Box>
          ) : (
            <></>
          )}
          <Box className={classes.containerProductsCard}>
          { products.length  == 0 ? (
              <Box display={"grid"} style={{ alignContent: "center"  , alignItems: "start"}} h={"50vh"}>
                <Loading />
              </Box>
            ) : (
              products.length > 1
                ?
                 products.map((ele) => (
                    <Box className={classes.productCard} key={ele.id}>
                      <Image
                        className={classes.imageCard}
                      src={ele.image}
                      w={100}
                      h={100}
                    />
                    <Box>
                      <Link
                        to={`/products/${ele.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Text className={classes.productTitle}>{ele.name}</Text>
                      </Link>
                      <Text ta={"start"} c={"#1a1a1a80"} fw={600} fz={12}>
                        Qyt 1
                      </Text>
                    </Box>
                    <Box>{showDiscount(ele.discount, ele.price)}</Box>
                  </Box>
                ))
              : products.map((ele) => (
                  <Box className={classes.singleProductCard} key={ele.id}>
                    <Link
                      to={`/products/${ele.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Text className={classes.singleProductTitle}>
                        {ele.name}
                      </Text>
                    </Link>
                    <Box className={classes.singlePrice}>
                      {showDiscount(ele.discount, ele.price)}
                    </Box>
                    <Text
                      className={classes.singleProductQyt}
                      c={"#1a1a1a99"}
                      fw={500}
                      fz={14}
                    >
                      Qyt 1, ${totalPrice}.00 each{" "}
                    </Text>
                    <Box
                      className={classes.singleProductImage}
                      display={"flex"}
                      style={{ justifySelf: "center" }}
                    >
                      <Image
                        src={ele.image}
                        className={classes.singleImage}
                        mt={15}
                      />
                    </Box>
                    <Box></Box>
                  </Box>
                ))
              )
          }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
