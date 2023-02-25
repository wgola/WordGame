import { FormInput } from "../../../components";

interface LoginFormFieldsProps {
  loading: boolean;
}

export const LoginFormFields = ({ loading }: LoginFormFieldsProps) => (
  <>
    <FormInput fieldName="username" disabled={loading} />
    <FormInput fieldName="password" type="password" disabled={loading} />
  </>
);