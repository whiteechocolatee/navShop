import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  phone: yup
    .string()
    .required()
    .matches(/^[0-9]+$/)
    .min(9)
    .max(12),
});
