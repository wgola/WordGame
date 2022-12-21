import * as Yup from "yup";
import { LoginFieldsNames } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  [LoginFieldsNames.USERNAME]: Yup.string().required(
    `${LoginFieldsNames.USERNAME} is required!`
  ),
  [LoginFieldsNames.PASSWORD]: Yup.string().required(
    `${LoginFieldsNames.PASSWORD} is required!`
  ),
});

export default yupResolver(validationSchema);
