import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountFields } from "../../../components/AccountFields";
import { Button } from "../../../components/Button";
import { ButtonDiv } from "../../../components/ButtonDiv";
import { ErrorDiv } from "../../../components/ErrorDiv";
import { Form } from "../../../components/Form";
import { getUser } from "../../../state/UserSlice";
import { updateAccount } from "../../../utils";
import { EditFieldsNames, EditFieldsTypes } from "./editTypes";
import editValidationSchema from "./editValidationSchema";

export const EditAccountForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(<p></p>);

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

  const onSubmit: SubmitHandler<EditFieldsTypes> = async (data) => {
    setError(<p></p>);
    setLoading(true);
    const result = await updateAccount(data);
    setLoading(false);
    if (result) {
      navigate("/home/account");
    } else setError(<p>Invalid account data: login or email taken!</p>);
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <AccountFields loading={loading} editForm={true} />
        <ErrorDiv>{loading ? <CircularProgress size={25} /> : error}</ErrorDiv>
        <ButtonDiv>
          <Button name="submit changes" type="submit" disabled={loading} />
          <Button
            name="back"
            type="button"
            onClick={() => navigate("/home/account")}
            disabled={loading}
          />
        </ButtonDiv>
      </Form>
    </FormProvider>
  );
};
