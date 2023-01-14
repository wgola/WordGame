import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Button, ButtonDiv, ErrorDiv, Form } from "../../../components";
import { LoginFormFields } from "./LoginFormFields";
import { LoginFieldsNames, loginFieldsTypes } from "../../../types";
import { saveUserData } from "../../../state/UserSlice";
import { login } from "../../../api";
import validationSchema from "./validationSchema";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(<p></p>);
  const [loading, setLoading] = useState(false);

  const formMethods = useForm<loginFieldsTypes>({
    defaultValues: {
      [LoginFieldsNames.USERNAME]: "",
      [LoginFieldsNames.PASSWORD]: "",
    },
    resolver: validationSchema,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<loginFieldsTypes> = async (data) => {
    setError(<p></p>);
    setLoading(true);
    const user = await login(data);
    if (user !== null) {
      dispatch(saveUserData(user));
      navigate("/home/play");
    } else {
      setLoading(false);
      setError(<p>Wrong login data!</p>);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <LoginFormFields loading={loading} />
        <ErrorDiv>{loading ? <CircularProgress size={25} /> : error}</ErrorDiv>
        <ButtonDiv>
          <Button children="login" type="submit" disabled={loading} />
          <Button
            children="register"
            type="button"
            onClick={() => navigate("/register")}
            disabled={loading}
          />
        </ButtonDiv>
      </Form>
    </FormProvider>
  );
};
