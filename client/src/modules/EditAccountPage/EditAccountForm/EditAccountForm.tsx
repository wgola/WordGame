import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountFields } from "../../../components/AccountFields";
import { Button } from "../../../components/Button";
import { ButtonDiv } from "../../../components/ButtonDiv";
import { ErrorDiv } from "../../../components/ErrorDiv";
import { Form } from "../../../components/Form";
import { getUser } from "../../../state/UserSlice";
import { EditFieldsNames, EditFieldsTypes } from "./editTypes";
import editValidationSchema from "./editValidationSchema";

export const EditAccountForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const formMethods = useForm<EditFieldsTypes>({
    defaultValues: {
      [EditFieldsNames.USERNAME]: user.username,
      [EditFieldsNames.EMAIL]: user.email,
      [EditFieldsNames.COLOR]: user.color,
    },
    resolver: editValidationSchema,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<EditFieldsTypes> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <AccountFields loading={false} editForm={true} />
        <ErrorDiv />
        <ButtonDiv>
          <Button name="submit changes" type="submit" />
          <Button
            name="back"
            type="button"
            onClick={() => navigate("/home/account")}
          />
        </ButtonDiv>
      </Form>
    </FormProvider>
  );
};
