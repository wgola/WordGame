import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AccountFields,
  Button,
  ButtonDiv,
  ErrorDiv,
  Form,
} from "../../../components";
import { getUser, saveUserData } from "../../../state/UserSlice";
import { getUserData, updateAccount } from "../../../api";
import { EditFieldsNames, editFieldsTypes } from "../../../types";
import editValidationSchema from "./validationSchema";

export const EditAccountForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(<p></p>);

  const formMethods = useForm<editFieldsTypes>({
    defaultValues: {
      [EditFieldsNames.USERNAME]: user.username,
      [EditFieldsNames.EMAIL]: user.email,
      [EditFieldsNames.COLOR]: user.color,
    },
    resolver: editValidationSchema,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<editFieldsTypes> = async (data) => {
    setError(<p></p>);
    setLoading(true);
    const result = await updateAccount(data);
    setLoading(false);
    if (result) {
      const userData = await getUserData();
      if (userData !== null) {
        dispatch(saveUserData(userData));
        navigate("/home/account");
      }
      navigate("/login");
    } else setError(<p>Invalid account data: login or email taken!</p>);
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <AccountFields loading={loading} editForm={true} />
        <ErrorDiv>{loading ? <CircularProgress size={25} /> : error}</ErrorDiv>
        <ButtonDiv>
          <Button children="submit changes" type="submit" disabled={loading} />
          <Button
            children="back"
            type="button"
            onClick={() => navigate("/home/account")}
            disabled={loading}
          />
        </ButtonDiv>
      </Form>
    </FormProvider>
  );
};
