import { Box, Button, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ConfirmationEmail.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ConfirmEmailSchema from "./schema/ConfirmEmailSchema";
import { useEffect, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";
import { notifications } from "@mantine/notifications";

const endpointForUsers = API_CONFIG.endpoints.users.allUsers;

export default function ConfirmationEmail() {

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");

   useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForUsers)
      .then((res) => res.json())
      .then((data) => {
        setEmail(data);
      });
  }, []);


  function confirmEmail(values) {
    // هنا هتعمل طلب للسيرفر عشان تأكد الإيميل
    const getEmail= email.find((item) => item.email === values.email);
    
    if(!getEmail){
      // لو التأكيد فشل هتظهر رسالة خطأ
      notifications.show({
        title: "Email not found",
        color: "red",
      });      
    }
    else{
      sessionStorage.setItem("resetUser", JSON.stringify(getEmail.id));
    // لو التأكيد ناجح هتظهر رسالة نجاح
      notifications.show({
        title:"We sent a confirmation code, please check your email",
        color: "green",
        autoClose: 5000,
      }); 
      setTimeout(() => {
        navigateTo("/confirmation-code");
      }, 500);   
    }
  }

  return (
    <Box className={classes.up}>
      <Box className={classes.back}>
        <Box className={classes.parent}>
          <Formik
            initialValues={{ email: ""}}
              onSubmit={confirmEmail}
            validationSchema={ConfirmEmailSchema}
          >
            <Form className={classes.loginFrom}>
              <Text className={classes.title}>
                Email Confirmation
              </Text>

              <Box mt={-7}>
                
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className={classes.inputFiled}
                />
                <ErrorMessage
                  name="email"
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
                    <Link to={"/sign-up"} style={{ textDecoration: "underline" }} className={classes.btnSignup}>
                      sign up
                    </Link>
                  </span>
                </Text>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
