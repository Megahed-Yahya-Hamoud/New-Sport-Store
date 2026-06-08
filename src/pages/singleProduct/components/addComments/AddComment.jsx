import { Box, Button, Input, NumberInput, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import classes from "./AddCommentStyle.module.css";
import { useEffect, useRef, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import { IconSendFilled } from "@tabler/icons-react";

export default function AddComment({
  id,
  onCommentAdded,
  reviewId,
  setReviewId,
}) {
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(0);

  const selectRef = useRef();
  const inputSelectRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [check, setCheck] = useState(true);

  const endpointForUsers = API_CONFIG.endpoints.users.allUsers;
  const endpointForProduct = API_CONFIG.endpoints.products.allProducts;

  const getUser = JSON.parse(localStorage.getItem("currentUser"));

  const userIcon = (
    <Text className={classes.userIcon}>{firstName?.[0]?.toUpperCase()}</Text>
  );

  // user data
  useEffect(() => {
    if (!getUser) return;

    fetch(API_CONFIG.mainUrl + endpointForUsers + getUser)
      .then((res) => res.json())
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
      });
  }, [getUser]);

  // load review for edit
  useEffect(() => {
    if (!reviewId) return;

    fetch(`${API_CONFIG.mainUrl}${endpointForProduct}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const review = data.reviews?.find((r) => r.id == reviewId);

        if (review) {
          setValue(review.comment);
          setRating(review.rating);

          // مهم: نزامن الـ refs كمان
          if (selectRef.current) {
            selectRef.current.value = review.rating;
          }
          if (inputSelectRef.current) {
            inputSelectRef.current.value = review.rating;
          }
        }
      });
  }, [reviewId, id]);

  async function sendComment(comment, reviewRating) {
    if (!getUser) {
      return notifications.show({
        title: "You must be logged in to add a comment",
        color: "orange",
      });
    }

    if (!comment.trim()) {
      setCheck(false);
      return;
    }

    setCheck(true);

    try {
      const res = await fetch(
        `${API_CONFIG.mainUrl}${endpointForProduct}/${id}`,
      );

      const data = await res.json();
      data.reviews = data.reviews || [];

      // 🔥 EDIT MODE
      if (reviewId) {
        data.reviews = data.reviews.map((review) =>
          review.id == reviewId
            ? {
                ...review,
                comment: comment,
                rating: reviewRating,
              }
            : review,
        );

        await fetch(`${API_CONFIG.mainUrl}${endpointForProduct}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // reset
        setValue("");
        setRating(0);
        setReviewId(null);

        if (selectRef.current) selectRef.current.value = "";

        if (inputSelectRef.current) inputSelectRef.current.value = "";

        onCommentAdded?.();
        return;
      }

      // ➕ ADD MODE
      const newReview = {
        id: Date.now(),
        user: `${firstName} ${lastName}`,
        rating: reviewRating,
        comment,
      };

      data.reviews.push(newReview);

      await fetch(`${API_CONFIG.mainUrl}${endpointForProduct}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setValue("");
      setRating(0);

      if (selectRef.current) selectRef.current.value = "";

      if (inputSelectRef.current) inputSelectRef.current.value = "";

      onCommentAdded?.();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box className={classes.addComment}>
      {userIcon}
      {/* INPUT 1 */}
      <Input
        className={classes.inputComment}
        style={{
          border: !check ? "1px solid red" : "1px solid black",
          borderRadius: "8px",
        }}
        variant="filled"
        placeholder="Add your comment"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />{" "}
      {/* NUMBER INPUT */}
      <NumberInput
        className={classes.largeSize}
        w="15%"
        placeholder="Your rating"
        max={5}
        min={1}
        ref={selectRef}
        value={rating}
        onChange={(val) => setRating(Number(val) || 0)}
      />{" "}
      {/* BUTTON */}
      <Button
        className={classes.largeSize}
        variant="filled"
        color="black"
        onClick={() => sendComment(value, rating)}
      >
        <IconSendFilled className={classes.iconSend} />
        <span className={classes.textSend}>{reviewId ? "Update" : "Send"}</span>
      </Button>
      {/* INPUT 2 (زي ما هو بس متصل بالحالة) */}
      <Input
        className={classes.smallSize}
        w="80px"
        placeholder="Rating"
        ref={inputSelectRef}
        value={rating}
        onChange={(e) => setRating(Number(e.currentTarget.value) || 0)}
      />
      <Button
        className={classes.smallSize}
        variant="filled"
        color="black"
        onClick={() => sendComment(value, rating)}
      >
        <IconSendFilled className={classes.iconSend} />
      </Button>
    </Box>
  );
}
