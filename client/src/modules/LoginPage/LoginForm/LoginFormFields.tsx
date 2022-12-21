import { Input } from "../../../components/Input";

interface LoginFormFieldsProps {
  loading: boolean;
}

export const LoginFormFields = ({ loading }: LoginFormFieldsProps) => (
  <>
    <Input fieldName="username" disabled={loading} />
    <Input fieldName="password" type="password" disabled={loading} />
  </>
);
