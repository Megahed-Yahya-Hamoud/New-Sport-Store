import { Box, Image, Text } from "@mantine/core";
import classes from "./RelatedProductsStyle.module.css";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import AddToCart from "../../../../components/addToCart/AddToCart";
import Loading from "../../../../components/loading/Loading";
import { Link } from "react-router-dom";
import AddToFavorites from "../../../../components/addToFavorites/AddToFavorites";

const endpointForProduct = API_CONFIG.endpoints.products.allProducts;

export default function RelatedProducts({ category , id }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForProduct + `?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        (setProducts(data));
      });
  }, [category]);

  return (
    <Box className={classes.relatedProducts}>
      <Box mt={30} className={classes.firstTitle}>
        <Text className={classes.title}>Related products</Text>
      </Box>
      <Carousel
        height={250}
        slideSize="20%"
        withIndicators
        controlSize={40}
        className={classes.carousel}
        emblaOptions={{ dragFree: true, align: "start" }}
        slideGap="sm"
        emblaOptions={{
          loop: false,
        }}
        controlsOffset="xs"
        styles={{
          indicator: {
            backgroundColor: "black",
          },
          viewport: {
            height: "430px",
          },
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            product.id != id ?
            <Carousel.Slide key={product.id}>
              <Box key={product.id} className={classes.parentCard}>
                <Box style={{ position: "relative" }} className={classes.card}>
                  <Image className={classes.imageCard} src={product.image} />
                  <AddToFavorites id={product.id} />
                </Box>
                <Box className={classes.details}>
                  <Link to={`/products/${product.id}`} className={classes.text}>
                    {product.name}
                  </Link>
                  <Text fz={20} fw={700} c={"red"} className={classes.price}>
                    {product.price}$
                  </Text>
                </Box>
                <Box mt={10}>
                  <AddToCart id={product.id} />
                </Box>
              </Box>
            </Carousel.Slide> :""
          ))
        ) : (
          <Box>
            <Loading />
          </Box>
        )}
      </Carousel>
    </Box>
  );
}
