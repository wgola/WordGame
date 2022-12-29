import { RegisterFieldsNames } from "../../types";
import { FormInput } from "../FormInput";

interface AccountFieldsProps {
  loading: boolean;
  editForm?: boolean;
}

export const AccountFields = ({
  loading,
  editForm = false,
}: AccountFieldsProps) => {
  return (
    <>
      <FormInput fieldName={RegisterFieldsNames.USERNAME} disabled={loading} />
      <FormInput fieldName={RegisterFieldsNames.EMAIL} disabled={loading} />
      {!editForm && (
        <FormInput
          fieldName={RegisterFieldsNames.PASSWORD}
          type="password"
          disabled={loading}
        />
      )}
      <FormInput
        type="color"
        fieldName={RegisterFieldsNames.COLOR}
        disabled={loading}
      />
    </>
  );
};
