import { Box, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./LoginStyle.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import LoginSchema from "./schema/LoginSchema";
import API_CONFIG from "../../../core/utils/apiConfig";
import { notifications } from "@mantine/notifications";

export default function Login() {
  const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

  async function loginUser(values) {
  try {
    // نجيب كل اليوزرز
    const res = await fetch(API_CONFIG.mainUrl + endpointForUsers);
    const data = await res.json();

    // نلاقي يوزر بنفس الإيميل والباسورد
    const user = data.find(
      (user) =>
        user.email === values.email &&
        user.password === values.password
    );

    // لو اليوزر مش موجود
    if (!user) {
      console.log("Invalid email or password");
      return notifications.show({
            message: "Invalid email or password",
            position: "top-right",
            color: "red",
          });
    }

    // لو موجود
    console.log("Login successful", user);

    // ممكن تخزنيه في localStorage
    localStorage.setItem("currentUser", JSON.stringify(user.id));
    notifications.show({
            message: "Login successful. Welcome back!",
            position: "top-right",
            color: "green",
          });
    setTimeout(() => {
      location.href = "/";
            window.location.reload();
        }, 1000);


  } catch (error) {
    console.error("Error:", error);
  }
  
}

  return (
    <Box className={classes.back}>
      <Box className={classes.parent}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={loginUser}
          validationSchema={LoginSchema}
        >
          <Form className={classes.loginFrom}>
            <Text c={"black"} ta={"center"} fw={700} fz={30}>
              Login
            </Text>

            <Box mt={-7}>
              <label htmlFor="email" className={classes.label}>
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className={classes.inputFiled}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>

            <Box>
              <Box
                display={"flex"}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="password" className={classes.label}>
                  Password
                </label>
                <Text fz={14} fw={400} c={"black"}>
                  <Link style={{ textDecoration: "underline" }} to={"/confirmation-email"} className={classes.btnSignup}>
                    Forget?
                  </Link>
                </Text>
              </Box>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="password"
                className={classes.inputFiled}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>
            <Button mt={5} type="submit" color="black">
              Submit
            </Button>
            <Box mt={-5} ta={"center"}>
              <Text m={0} fz={15} fw={400}>
                Don{"'"}t have an account?{" "}
                <span>
                  {" "}
                  <Link style={{ textDecoration: "underline" }} to={"/sign-up"} className={classes.btnSignup}>
                    sign up
                  </Link>
                </span>
              </Text>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}
