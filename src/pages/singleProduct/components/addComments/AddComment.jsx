import { Box, Button, Input, NumberInput, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import classes from "./AddCommentStyle.module.css";
import { useEffect, useRef, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import { IconSendFilled } from "@tabler/icons-react";

export default function AddComment({ id, onCommentAdded }) {
  const [value, setValue] = useState("");
  const endpointForUsers = API_CONFIG.endpoints.users.allUsers;
  const endpointForProduct = API_CONFIG.endpoints.products.allProducts;
  const selectRef = useRef();
  const inputSelectRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [check, setCheck] = useState(true);

  const getUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForUsers + getUser)
      .then((res) => res.json())
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
      });
  });

  const userIcon = (
    <Text className={classes.userIcon}> {firstName?.[0]?.toUpperCase()}</Text>
  );

  async function sendComment(value, rating) {
    if (!getUser) {
      
      return notifications.show({
        title: "You must be logged in to add a comment",
        color: "orange",
      });
    }
    // تحقق لو التعليق فاضي
    if (!value.trim()) {
      setCheck(false);
      console.log("is empty");
      return;
    }
    setCheck(true);

    if (rating > 5) {
      rating = 5;
    }
    // التعليق الجديد
    const newReview = {
      id: Date.now(), // id تلقائي
      user: `${firstName} ${lastName}`,
      rating: rating,
      comment: value,
    };

    try {
      // هات بيانات المنتج الحالية
      const res = await fetch(
        `${API_CONFIG.mainUrl}${endpointForProduct}/${id}`,
      );
      const data = await res.json();

      // لو reviews مش موجودة
      data.reviews = data.reviews || [];

      // ضيف الريفيو الجديد
      data.reviews.push(newReview);

      // console.log(data.reviews);

      // ابعت البيانات بعد التعديل
      await fetch(`${API_CONFIG.mainUrl}${endpointForProduct}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      onCommentAdded();

      // console.log("Review added successfully");
    } catch (error) {
      console.log("Error:", error);
    }
  }
  return (
    <Box className={classes.addComment}>
      {userIcon}
      <Input
        styles={{
          wrapper: {
            outlineColor: "black",
          },
        }}
        className={classes.inputComment}
        style={{
          border: !check ? "1px solid red" : "1px black",
          borderRadius: "8px",
        }}
        variant="filled"
        placeholder="Add your comment"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
          value ? (
            <Input.ClearButton
              aria-label="Clear input"
              onClick={() => setValue("")}
            />
          ) : null
        }
      />
        <NumberInput
          className={classes.largeSize}
          w={"15%"}
          placeholder="Your rating"
          max={5}
          min={1}
          ref={selectRef}
        />
        <Button
          className={classes.largeSize}
          variant="filled"
          color={"black"}
          onClick={() => {
            sendComment(value, Number(selectRef.current.value));
          }}
        >
          <IconSendFilled className={classes.iconSend} />
          <span className={classes.textSend}>Send</span>
        </Button>

        <Input
          className={classes.smallSize}
          w={"80px"}
          placeholder="Rating"
          max={5}
          min={1}
          ref={inputSelectRef}
        />

        <Button
          className={classes.smallSize}
          variant="filled"
          color={"black"}
          onClick={() => {
            sendComment(value, Number(inputSelectRef.current.value));
          }}
        >
          <IconSendFilled className={classes.iconSend} />
        </Button>
    </Box>
  );
}
