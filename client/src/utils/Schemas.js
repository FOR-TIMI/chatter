import * as yup from "yup";


export const registerSchema = yup.object().shape({
    username: yup.string().min(2).required("required"),
    email: yup.string().email("invalid email").min(8).required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
  });

export const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});