/* eslint-disable no-unused-vars */
import { Box, Button, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterStyle.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SignupSchema from "./schema/SignupSchema";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import API_CONFIG from "../../../core/utils/apiConfig";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;
export default function Register() {

  const navigate = useNavigate();
  // to check if email exist in database or not
  const [isEmailExist, setIsEmailExist] = useState(false);
// to handel submit form and add user to database 
  async function handelSubmitAddUser(values) {
    try {
      // fetch all users to check if email exist in database or not
      const res = await fetch(API_CONFIG.mainUrl + endpointForUsers);
      const data = await res.json();
// to check if email exist in database or not and set isEmailExist to true if email exist in database 
// and if email exist in database return boolean true and if email not exist in database return boolean false and set isEmailExist to false
      const emailExists = data.some((user) => user.email === values.email);
      setIsEmailExist(emailExists);
// if email exist in database log email already exists and return to stop function 
      if (emailExists) {
        // console.log("Email already exists");
        return notifications.show({
            message: "Email already exists. Please use a different email.",
            position: "top-right",
            color: "red",
          }); // مهم جدًا توقف هنا
      }
// if email not exist in database create userData object to send it to database to add user to database and delete confirmPassword from userData object because we don't need it in database
      let userData = { ...values , favorites: [],cart: {items: [] , total_price: 0} };
      delete userData.confirmPassword;
// send userData to database to add user to database
      await fetch(API_CONFIG.mainUrl + endpointForUsers, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

       notifications.show({
            message: "User created successfully. Please log in.",
            position: "top-right",
            color: "green",
          });
          navigate("/login");

    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Box className={classes.back}>
      <Box className={classes.parent}>
        <Formik
          onSubmit={handelSubmitAddUser}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
        >
          <Form className={classes.signupFrom}>
            <Text c={"black"} ta={"center"} fw={700} fz={30}>
              Sign-up
            </Text>

            <Box mt={-7}>
              <label htmlFor="firstName" className={classes.label}>
                First Name
              </label>
              <br />
              <Field
                className={classes.inputFiled}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>
            <Box>
              <label htmlFor="lastName" className={classes.label}>
                Last Name
              </label>
              <br />
              <Field
                className={classes.inputFiled}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>
            <Box>
              <label htmlFor="email" className={classes.label}>
                Email
              </label>
              <Field
                className={classes.inputFiled}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>
            <Box>
              <label htmlFor="phone" className={classes.label}>
                Phone
              </label>
              <Field
                className={classes.inputFiled}
                id="phone"
                name="phone"
                type="number"
                placeholder="Phone number"
              />
              <ErrorMessage
                name="phone"
                component="div"
                style={{ color: "red", fontSize: "15px", fontWeight: 500 }}
              />
            </Box>
            <Box>
              <label htmlFor="password" className={classes.label}>
                Password
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
                Confirm password
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
            <Box mt={-5} ta={"center"}>
              <Text m={0} fz={15} fw={400}>
                Do you have an account?{" "}
                <span>
                  {" "}
                  <Link to={"/login"} style={{ textDecoration: "underline" }} className={classes.btnLogin}>
                    login
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
