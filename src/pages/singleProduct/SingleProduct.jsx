import { Box, Divider, Image, Text } from "@mantine/core";
import classes from "./SingleProductStyle.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API_CONFIG from "../../core/utils/apiConfig";
import Rating from "./components/rating/Rating";
import AddToCart from "../../components/addToCart/AddToCart";
import AddProductToFavorites from "../../components/addProductToFavorites/AddProductToFavorites";
import ProductColors from "./components/colors/ProductColors";
import ProductSize from "./components/sizes/ProductSize";
import ProductPieces from "./components/pieces/ProductPieces";
import CarouselImages from "./components/carouselImages/CarouselImages";
import RelatedProducts from "./components/relatedProducts/RelatedProducts";
import VideoReview from "./components/videoReview/VideoReview";
import AddComment from "./components/addComments/AddComment";
import Comments from "./components/comments/Comments";

const endpointForProduct = API_CONFIG.endpoints.products.allProducts;
export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState([]);
  // const [category, setCategory] = useState();
  const [active, setActive] = useState();
  const [refreshComments, setRefreshComments] = useState(false);
  const [reviewId, setReviewId] = useState();
  
  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForProduct + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setActive(data.images[0]);
        setColors(data.colors);
        // setCategory(data.category);
      });
  }, [id]);

  return (
    <Box className={classes.singleProduct}>
      {/* <Companies/> */}
      <Box className={classes.descriptionProduct}>
        <Box className={classes.containerImages}>
          <Box className={classes.subImages}>
            {product.images &&
              product.images.map((image) => (
                <Image
                  className={classes.subImage}
                  key={image}
                  src={image}
                  w={"100px"}
                  h={"100px"}
                  style={{
                    border: active == image ? "2px solid black" : "2px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    setActive(image);
                  }}
                />
              ))}
          </Box>
          <Box className={classes.mainImage}>
            <Image src={active} className={classes.image} />
          </Box>

          {/* show when width 615px */}
          <Box className={classes.carouselImages}>
            <CarouselImages images={product.images} />
          </Box>
        </Box>

        <Box className={classes.details} px={10}>
          <Text mt={0} mb={0} className={classes.title} fw={"700"} fz={25}>
            {product.name}
          </Text>
          <Text
            mt={0}
            mb={0}
            c={""}
            className={classes.description}
            fw={"400"}
            fz={20}
          >
            {product.description}
          </Text>
          <Text fz={22} className={classes.title} pl={1} fw={600} c={"#007185"}>
            Brand: <span style={{ color: "black" }}>{product.brand}</span>
          </Text>
          <Text className={classes.price} c={""} fw={"700"} my={0} fz={25}>
            {product.price}.00
            <span
              style={{
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              ${" "}
            </span>
          </Text>

          <Rating rating={product.rating} />

          {/* </Box> */}
          <Divider my={10} />
          <Box mb={20}>
            <Box>
              <ProductColors colors={colors} />
            </Box>
          </Box>
          <Box display={product.size?.length > 0 ? "" : "grid"} className={classes.containerDetails}>
            <Box>
              {
                product.size?.length > 0 ?(
                  <ProductSize  size={product.size} />
                ):
                (<></>)
              }
            </Box>
            <Box>
              <ProductPieces size={product.size?.length} quantity={product.quantity} />
            </Box>
          </Box>
          {/* <Divider my={20} /> */}
          <Box className={classes.containerBtn}>
            
            <AddToCart id={product.id} />
            <AddProductToFavorites id={product.id} />
          </Box>
        </Box>
      </Box>
      <Box>
        <RelatedProducts id={product.id || id} category={product.category} />
      </Box>
      <Box>
        <VideoReview src={product.video} />
      </Box>
      <Box className={classes.containerComments}>
        <Box mt={30} className={classes.firstTitle}>
          <Text className={classes.title}>Top reviews from the worlds</Text>
        </Box>
        {/* <AddComment
          onCommentAdded={() => setRefreshComments((prev) => !prev)}
          id={product.id}
          reviewId={reviewId}
        />
        <Comments  setReviewId={setReviewId} refresh={refreshComments} id={product.id || id}  /> */}
        <AddComment
  onCommentAdded={() => setRefreshComments((prev) => !prev)}
  id={product.id}
  reviewId={reviewId}
  setReviewId={setReviewId}
/>

<Comments
  onCommentAdded={() => setRefreshComments((prev) => !prev)}
  setReviewId={setReviewId}
  refresh={refreshComments}
  id={product.id || id}
/>
      </Box>
    </Box>
  );
}

// Related Products
