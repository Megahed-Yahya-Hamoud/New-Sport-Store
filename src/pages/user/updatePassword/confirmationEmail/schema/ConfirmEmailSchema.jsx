import * as yup from "yup";

const ConfirmEmailSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
  });

  export default ConfirmEmailSchema;
