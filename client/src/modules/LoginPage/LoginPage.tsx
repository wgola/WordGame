import { styled } from "@mui/material/styles";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { LoginFieldsNames, LoginFieldsTypes } from "./types";
import validationSchema from "./validationSchema";

const StyledForm = styled("form")`
  border-radius: 25px;
  padding: 40px;
  gap: 30px;
  width: 500px;
  background-color: #fffff0;
  margin: 70px auto;
  display: flex;
  flex-direction: column;
`;

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const LoginPage = () => {
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
      <StyledForm onSubmit={formMethods.handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <Input fieldName="username" />
        <Input fieldName="password" type="password" />
        <StyledDiv>
          <Button name="login" type="submit" />
          <Button name="register" type="button" />
        </StyledDiv>
      </StyledForm>
    </FormProvider>
  );
};
