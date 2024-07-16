import Yup from "yup";

export const validateData = async (req, res, next) => {
  const data = req.body;

  const dataSchema = Yup.object({
    //cannot identify if it is unique, requires the access of database
    //.email() checks if @ . are available in the email
    email: Yup.string().required().trim().max(55).email().lowercase(),
    password: Yup.string().required().trim().max(20),
    firstName: Yup.string().required().trim().max(30),
    lastName: Yup.string().required().trim().max(30),
  });
  try {
    const validatedData = await dataSchema.validate(data);
    req.body = validatedData;
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }

  next();
};
