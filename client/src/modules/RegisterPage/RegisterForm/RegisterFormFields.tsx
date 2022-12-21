import { Input } from "../../../components/Input";

interface RegisterFormFieldsProps {
  loading: boolean;
}

export const RegisterFormFields = ({ loading }: RegisterFormFieldsProps) => {
  return (
    <>
      <Input fieldName="username" disabled={loading} />
      <Input fieldName="email" disabled={loading} />
      <Input fieldName="password" type="password" disabled={loading} />
      <Input type="color" fieldName="color" disabled={loading} />
    </>
  );
};
