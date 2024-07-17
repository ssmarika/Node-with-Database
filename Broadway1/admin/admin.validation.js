import Yup from "yup";

export const adminValidationSchema = Yup.object({
  //cannot identify if it is unique, requires the access of database
  //.email() checks if @ . are available in the email
  email: Yup.string().required().trim().max(55).email().lowercase(),
  password: Yup.string().required().trim().max(20),
  firstName: Yup.string().required().trim().max(30),
  lastName: Yup.string().required().trim().max(30),
});

export const loginAdminValidationSchema = Yup.object({
  email: Yup.string().email().required().trim().lowercase(),
  password: Yup.string().required().trim(),
});
