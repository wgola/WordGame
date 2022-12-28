import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { EditFieldsNames } from "./editTypes";

const editValidation = Yup.object().shape({
  [EditFieldsNames.USERNAME]: Yup.string()
    .required(`${EditFieldsNames.USERNAME} is required!`)
    .min(5)
    .max(15),
  [EditFieldsNames.EMAIL]: Yup.string()
    .email("Enter correct email!")
    .required(`${EditFieldsNames.EMAIL} is required!`),
  [EditFieldsNames.COLOR]: Yup.string().required(
    `${EditFieldsNames.COLOR} is required!`
  ),
});

export default yupResolver(editValidation);
