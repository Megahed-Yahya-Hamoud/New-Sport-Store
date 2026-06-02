import * as yup from "yup";

const SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup
    .number()
    .required("Phone is required")
    .min(5, "Phone must be at least 5 numbers"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

export default SignupSchema;
