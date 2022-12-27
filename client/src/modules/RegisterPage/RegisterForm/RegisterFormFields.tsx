import { FormInput } from "../../../components/FormInput";

interface RegisterFormFieldsProps {
  loading: boolean;
}

export const RegisterFormFields = ({ loading }: RegisterFormFieldsProps) => {
  return (
    <>
      <FormInput fieldName="username" disabled={loading} />
      <FormInput fieldName="email" disabled={loading} />
      <FormInput fieldName="password" type="password" disabled={loading} />
      <FormInput type="color" fieldName="color" disabled={loading} />
    </>
  );
};
