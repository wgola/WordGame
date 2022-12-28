import { FormInput } from "../FormInput";

interface AccountFieldsProps {
  loading: boolean;
}

export const AccountFields = ({ loading }: AccountFieldsProps) => {
  return (
    <>
      <FormInput fieldName="username" disabled={loading} />
      <FormInput fieldName="email" disabled={loading} />
      <FormInput fieldName="password" type="password" disabled={loading} />
      <FormInput type="color" fieldName="color" disabled={loading} />
    </>
  );
};
