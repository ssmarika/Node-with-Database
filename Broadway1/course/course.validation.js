import Yup from "yup";

export const courseValidationSchema = Yup.object({
  name: Yup.string().max(60).required().trim(),
  price: Yup.number().required().min(1),
  duration: Yup.number().required().min(1),
});
