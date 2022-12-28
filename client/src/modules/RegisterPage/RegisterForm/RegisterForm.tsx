import { ButtonDiv } from "../../../components/ButtonDiv";
import { ErrorDiv } from "../../../components/ErrorDiv";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../../components/Form";
import { Button } from "../../../components/Button";
import { register } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { AccountFields } from "../../../components/AccountFields/";
import accountValidationSchema from "./registerValidationSchema";
import { RegisterFieldsNames, RegisterFieldsTypes } from "./registerTypes";

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
    resolver: accountValidationSchema,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFieldsTypes> = async (data) => {
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
      setTimeout(() => navigate("/login"), 3200);
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
