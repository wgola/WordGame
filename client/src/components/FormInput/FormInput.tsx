import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FieldValues, useFormContext } from "react-hook-form";

interface FormInputProps {
  fieldName: string;
  type?: string;
  disabled?: boolean;
}

const StyledTextField = styled(TextField)`
  height: 70px;
`;

export const FormInput = ({
  fieldName,
  type = "text",
  disabled,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const { ref: inputRef, ...inputProps } = register(fieldName);

  return (
    <StyledTextField
      type={type}
      inputRef={inputRef}
      {...inputProps}
      label={fieldName}
      error={!!errors?.[fieldName]}
      helperText={<>{errors?.[fieldName]?.message}</>}
      disabled={disabled}
    />
  );
};
