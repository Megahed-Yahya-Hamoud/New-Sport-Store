import { Box, Divider, Text } from "@mantine/core";
import classes from "./CommentsStyle.module.css";
import { useEffect, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import Rating from "../rating/Rating";

const endpointForProduct = API_CONFIG.endpoints.products.allProducts;

export default function Comments({ id, refresh }) {
  const [reviews, setReviews] = useState([]);
  // const [newRefresh, setNewRefresh] = useState(false);

  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForProduct + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  }, [id, refresh]);

  return (
    <Box mb={"50px"} className={classes.comments}>
      <Box>
        {reviews &&
          [...reviews].reverse().map((review, index) => (
            <Box key={review.id} className={classes.comment}>
              <Box mb={5} className={classes.user}>
                <Text className={classes.userIcon}>
                  {review.user?.[0]?.toUpperCase()}
                </Text>

                <Text fz={18} fw={700}>
                  {review.user}
                </Text>
              </Box>

              <Box ml={3} className={classes.rating}>
                <Rating rating={review.rating} />

                <Text className={classes.line} c={"rgb(202, 202, 202)"}>
                  |
                </Text>

                <Text fz={13} c={"orange"} fw={700}>
                  Verified Purchase
                </Text>
              </Box>

              <Box ml={3} className={classes.date}>
                <Text fz={17} c={"rgb(146, 146, 146)"}>
                  Reviewed in the United States on May 5, 2021
                </Text>
              </Box>

              <Text ml={3} fz={17} fw={600}>
                {review.comment}
              </Text>

              {index !== reviews.length - 1 ? <Divider my={20} /> : null}
            </Box>
          ))}
      </Box>
    </Box>
  );
}
