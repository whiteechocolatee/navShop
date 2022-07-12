import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  phone: yup.number().min(10).required(),
});
