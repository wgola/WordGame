import { ButtonDiv } from "../../../components/ButtonDiv";
import { ErrorDiv } from "../../../components/ErrorDiv";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../../components/Form";
import { Button } from "../../../components/Button";
import { RegisterFieldsNames, RegisterFieldsTypes } from "./types";
import validationSchema from "./validationSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { RegisterFormFields } from "./RegisterFormFields";
import { register } from "../../../utils";

export const RegsiterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(<p></p>);
  const navigate = useNavigate();

  const formMethods = useForm<RegisterFieldsTypes>({
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

  const onSubmit: SubmitHandler<RegisterFieldsTypes> = async (data) => {
    setError(<p></p>);
    setLoading(true);
    try {
      await register(data);
      setLoading(false);
      setError(
        <p style={{ color: "green" }}>
          You have registered succesfully! Redirecting to login page...
        </p>
      );
      setTimeout(() => navigate("/login"), 3200);
    } catch (e) {
      setLoading(false);
      setError(<p>Invalid register data: login or email taken!</p>);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <RegisterFormFields loading={loading} />
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
