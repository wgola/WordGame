import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AccountFieldsNames } from "./accountTypes";

const accountValidation = Yup.object().shape({
  [AccountFieldsNames.USERNAME]: Yup.string()
    .required(`${AccountFieldsNames.USERNAME} is required!`)
    .min(5)
    .max(15),
  [AccountFieldsNames.EMAIL]: Yup.string()
    .email("Enter correct email!")
    .required(`${AccountFieldsNames.EMAIL} is required!`),
  [AccountFieldsNames.PASSWORD]: Yup.string()
    .required(`${AccountFieldsNames.PASSWORD} is required!`)
    .min(8)
    .max(16),
  [AccountFieldsNames.COLOR]: Yup.string().required(
    `${AccountFieldsNames.COLOR} is required!`
  ),
});

export const accountValidationSchema = yupResolver(accountValidation);
