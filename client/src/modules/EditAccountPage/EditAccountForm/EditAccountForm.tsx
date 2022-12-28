import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Tile } from "../../../components/Tile";
import { getUser } from "../../../state/UserSlice";
import {
  AccountFieldsNames,
  AccountFieldsTypes,
  accountValidationSchema,
} from "../../../utils";

export const EditAccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const formMethods = useForm<AccountFieldsTypes>({
    defaultValues: {
      [AccountFieldsNames.USERNAME]: user.username,
      [AccountFieldsNames.EMAIL]: user.email,
      [AccountFieldsNames.PASSWORD]: user.password,
      [AccountFieldsNames.COLOR]: user.color,
    },
    resolver: accountValidationSchema,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  return <Tile width={900}>Edit account</Tile>;
};
