import { Box, Button, Divider, Menu, Text } from "@mantine/core";
import classes from "./CommentsStyle.module.css";
import { useEffect, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import Rating from "../rating/Rating";
import {
  IconDotsVerticalFilled,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

const endpointForProduct = API_CONFIG.endpoints.products.allProducts;
const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function Comments({ id, refresh, setReviewId, onCommentAdded }) {
  const [reviews, setReviews] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  // const [newRefresh, setNewRefresh] = useState(false);
  const getUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForProduct + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  }, [id, refresh]);

  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForUsers + getUser)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setFirstName(data.firstName);
        setLastName(data.lastName);
      });
  }, []);

  useEffect(() => {
    editComment();
    deleteComment();
  }, [firstName, lastName]);

  function editComment(id) {
    setUserName(firstName + " " + lastName);
    setReviewId(id);
  }

  async function deleteComment(commentId) {
    try {
      // 1. هات المنتج الحالي
      const res = await fetch(
        `${API_CONFIG.mainUrl}${endpointForProduct}/${id}`,
      );

      const data = await res.json();
      // لو مفيش ريفيوهات خالص يبقي يضيف ريفيوهات فاضية
      data.reviews = data.reviews || [];

      // 2. شوف الريفيو الحالي (لـ debug لو محتاج)
      const currentReview = data.reviews.find(
        (review) => review.id === commentId,
      );

      console.log("Current Review:", currentReview);

      // 3. امسح الريفيو
      const updatedReviews = data.reviews.filter(
        (review) => review.id !== commentId,
      );

      // 4. ابعت التعديل للسيرفر
      await fetch(`${API_CONFIG.mainUrl}${endpointForProduct}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          reviews: updatedReviews,
        }),
      });

      // 5. اعمل refresh لو موجود
      onCommentAdded?.();
    } catch (error) {
      console.log("Delete error:", error);
    }
  }

  return (
    <Box mb={"50px"} className={classes.comments}>
      <Box>
        {reviews &&
          [...reviews].reverse().map((review, index) => (
            <Box key={review.id} className={classes.comment}>
              <Box className={classes.headerComment}>
                <Box mb={5} className={classes.user}>
                  <Text className={classes.userIcon}>
                    {review.user?.[0]?.toUpperCase()}
                  </Text>
                  <Text fz={18} fw={700}>
                    {review.user}
                  </Text>
                </Box>
                {review?.user == userName && (
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
                          <IconDotsVerticalFilled stroke={2} />
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown w={"fit-content"} bg={"white"}>
                        <Menu.Item
                          w={"fit-content"}
                          m={0}
                          onClick={() => editComment(review.id)}
                          leftSection={
                            <IconEdit
                              size={17}
                              stroke={2}
                              className={classes.iconDotsTwo}
                            />
                          }
                        >
                          Edit
                        </Menu.Item>

                        <Menu.Item
                          title="Delete"
                          w={"fit-content"}
                          m={0}
                          onClick={() => deleteComment(review.id)}
                          leftSection={
                            <IconTrash
                              size={17}
                              stroke={2}
                              className={classes.iconDotsOne}
                            />
                          }
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Box>
                )}
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
