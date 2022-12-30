import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import {
  ButtonDiv,
  ErrorDiv,
  Form,
  Button,
  AccountFields,
} from "../../../components";
import { RegisterFieldsNames, registerFieldsTypes } from "../../../types";
import validationSchema from "./validationSchema";
import { register } from "../../../api";

export const RegsiterForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(<p></p>);

  const formMethods = useForm<registerFieldsTypes>({
    defaultValues: {
      [RegisterFieldsNames.USERNAME]: "",
      [RegisterFieldsNames.EMAIL]: "",
      [RegisterFieldsNames.PASSWORD]: "",
      [RegisterFieldsNames.COLOR]: "",
    },
    resolver: validationSchema,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<registerFieldsTypes> = async (data) => {
    setError(<p></p>);
    setLoading(true);
    const result = await register(data);
    setLoading(false);
    if (result) {
      setError(
        <p style={{ color: "green" }}>
          You have registered succesfully! Redirecting to login page...
        </p>
      );
      setTimeout(() => navigate("/login"), 2500);
    } else {
      setError(<p>Invalid register data: login or email taken!</p>);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <AccountFields loading={loading} />
        <ErrorDiv>{loading ? <CircularProgress size={25} /> : error}</ErrorDiv>
        <ButtonDiv>
          <Button name="register" type="submit" disabled={loading} />
          <Button
            name="login"
            type="button"
            onClick={() => navigate("/login")}
            disabled={loading}
          />
        </ButtonDiv>
      </Form>
    </FormProvider>
  );
};
