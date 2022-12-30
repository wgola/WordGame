import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { RegisterFieldsNames } from "../../../types";

const validationSchema = Yup.object().shape({
  [RegisterFieldsNames.USERNAME]: Yup.string()
    .required(`${RegisterFieldsNames.USERNAME} is required!`)
    .min(5)
    .max(15),
  [RegisterFieldsNames.EMAIL]: Yup.string()
    .email("Enter correct email!")
    .required(`${RegisterFieldsNames.EMAIL} is required!`),
  [RegisterFieldsNames.PASSWORD]: Yup.string()
    .required(`${RegisterFieldsNames.PASSWORD} is required!`)
    .min(8)
    .max(16),
  [RegisterFieldsNames.COLOR]: Yup.string().required(
    `${RegisterFieldsNames.COLOR} is required!`
  ),
});

export default yupResolver(validationSchema);
