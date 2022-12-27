import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { ButtonDiv } from "../../../components/ButtonDiv";
import { ErrorDiv } from "../../../components/ErrorDiv";
import { Form } from "../../../components/Form";
import { saveUserData } from "../../../state/UserSlice";
import { login } from "../../../utils";
import { LoginFormFields } from "./LoginFormFields";
import { LoginFieldsNames, LoginFieldsTypes } from "./types";
import validationSchema from "./validationSchema";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(<p></p>);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formMethods = useForm<LoginFieldsTypes>({
    defaultValues: {
      [LoginFieldsNames.USERNAME]: "",
      [LoginFieldsNames.PASSWORD]: "",
    },
    resolver: validationSchema,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFieldsTypes> = async (data) => {
    setError(<p></p>);
    setLoading(true);
    const user = await login(data);
    if (user !== null) {
      dispatch(saveUserData(user));
      navigate("/");
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
          <Button name="login" type="submit" disabled={loading} />
          <Button
            name="register"
            type="button"
            onClick={() => navigate("/register")}
            disabled={loading}
          />
        </ButtonDiv>
      </Form>
    </FormProvider>
  );
};
