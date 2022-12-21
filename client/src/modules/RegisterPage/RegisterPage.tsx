import { styled } from "@mui/material/styles";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { RegisterFieldsNames, RegisterFieldsTypes } from "./types";
import validationSchema from "./validationSchema";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const RegisterPage = () => {
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

  const onSubmit: SubmitHandler<RegisterFieldsTypes> = (data) => {
    formMethods.reset();
    console.log(JSON.stringify(data));
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <Input fieldName="username" />
        <Input fieldName="email" />
        <Input fieldName="password" type="password" />
        <Input type="color" fieldName="color" />
        <StyledDiv>
          <Button name="login" type="submit" />
          <Button name="register" type="button" />
        </StyledDiv>
      </Form>
    </FormProvider>
  );
};
