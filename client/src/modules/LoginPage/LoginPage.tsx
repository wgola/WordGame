import { styled } from "@mui/material/styles";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { LoginFieldsNames, LoginFieldsTypes } from "./types";
import validationSchema from "./validationSchema";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const LoginPage = () => {
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

  const onSubmit: SubmitHandler<LoginFieldsTypes> = (data) => {
    formMethods.reset();
    console.log(JSON.stringify(data));
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <Input fieldName="username" />
        <Input fieldName="password" type="password" />
        <StyledDiv>
          <Button name="login" type="submit" />
          <Button
            name="register"
            type="button"
            onClick={() => navigate("/register")}
          />
        </StyledDiv>
      </Form>
    </FormProvider>
  );
};
