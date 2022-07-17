import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("First Name should be required please"),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null]),
});
