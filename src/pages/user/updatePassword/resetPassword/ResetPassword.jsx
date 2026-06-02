/* eslint-disable no-unused-vars */
import { Box, Button, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ResetPassword.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ResetPasswordSchema from "./schema/ResetPasswordSchema";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import API_CONFIG from "../../../../core/utils/apiConfig";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;
export default function ResetPassword() {
    const navigateTo = useNavigate();
    const userId = JSON.parse(sessionStorage.getItem("resetUser"));
    console.log(userId)

    useEffect(() => {
      if (!userId) {
        notifications.show({
          message: "Please enter your email first to reset your password.",
          color: "red",
        });
        navigateTo("/confirmation-email");
      }
    }, [userId, navigateTo]);
    
    // دالة لتحديث كلمة المرور
async function handleResetPassword(values) {

  try {
    const response = await fetch(API_CONFIG.mainUrl + endpointForUsers + `${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: values.password }),
    });

    const data = await response.json();

    if (response.ok) {
      // نجح التحديث
      notifications.show({
        message: "Password reset successful! You can now log in.",
        color: "green",
      });
      // حذف البيانات المؤقتة
      sessionStorage.removeItem("resetUser");
      // الانتقال لصفحة تسجيل الدخول
      setTimeout(() => {
        navigateTo("/login");
      }, 1000);
    } else {
      // فشل التحديث
      notifications.show({
        message: data.message || "Failed to reset password. Please try again.",
        color: "red",
      });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    notifications.show({
      message: "An error occurred. Please try again.",
      color: "red",
    });
  }
}

  return (
    <Box className={classes.back}>
      <Box className={classes.parent}>
        <Formik
          onSubmit={handleResetPassword}
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={ResetPasswordSchema}
        >
          <Form className={classes.signupFrom}>
            <Text className={classes.title} >
              Reset Password
            </Text>

            <Box>
              <label htmlFor="password" className={classes.label}>
                New Password
              </label>
              <Field
                className={classes.inputFiled}
                type="password"
                id="password"
                name="password"
                placeholder="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>
            <Box>
              <label htmlFor="confirmPassword" className={classes.label}>
                Confirm New Password
              </label>
              <Field
                className={classes.inputFiled}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirm password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>

            <Button mt={5} type="submit" color="black">
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}
