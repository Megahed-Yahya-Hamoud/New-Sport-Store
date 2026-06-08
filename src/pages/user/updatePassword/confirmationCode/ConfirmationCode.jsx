import { Box, Button, Text } from "@mantine/core";
import classes from "./ConfirmationCode.module.css";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function ConfirmationCode() {
  const [otp, setOpt] = useState(new Array(6).fill(""));
    const navigateTo = useNavigate();

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;

    setOpt([
      ...otp.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    } else if (!e.target.value) {
      e.target.previousSibling.focus();
    }
  }

  function handlePoste(e) {
    const value = e.clipboardData.getData("text");
    if (isNaN(value)) return false;

    const updateValue = value.toString().split("").slice(0, otp.length);
    setOpt(updateValue);

    const focusedInput = e.target.parentNode.querySelector("input:focus");

    if (focusedInput) {
      focusedInput.blur();
    }
  }

  function check() {
    console.log(...otp);
    const otpCode = otp.join("");
    if (otpCode.length === 6){
      console.log("success");
      notifications.show({
        title: "Successfully verified",
        message: "Now you can update your password",
        color:"green",
      })
      setTimeout(()=>{
        navigateTo("/reset-password");
      }, 500)
    }else{
      console.log("error");
      notifications.show({
        title: "Error",
        message: "Invalid verification code. Please check your email and try again.",
        color:"red",
      })
    }
  }


  return (
    <Box px={5}>
      <Box mt={70} display={"grid"} style={{ justifyItems: "center" }}>
        <Text fz={30} fw={700}>
          Verification code
        </Text>
        <Text ta={"center"} fz={20} fw={500}>
          A confirmation code has been sent
        </Text>
        <Text ta={"center"}>Check your email address</Text>
        <Text ta={"center"}>Add any code</Text>
      </Box>
      <Box
        mt={20}
        display={"flex"}
        style={{ justifyContent: "center", gap: "10px" }}
      >
        {otp.map((data, i) => (
          <input
            key={i}
            type="text"
            className={classes.input}
            placeholder="0"
            value={data}
            maxLength={1}
            onChange={(e) => handleChange(e, i)}
            onPaste={(e) => handlePoste(e)}
          />
        ))}
      </Box>
      <Box mt={20} display={"flex"} style={{ justifyContent: "center" }}>
        <Button
          onClick={() => check()}
          color="black"
          style={{ borderRadius: "20px" }}
          className={classes.btnSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
