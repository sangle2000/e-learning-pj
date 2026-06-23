import * as yup from "yup"

export const signInSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export const signUpSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password"), null], "Passwords must match"),
});
