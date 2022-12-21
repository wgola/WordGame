import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FieldValues, useFormContext } from "react-hook-form";

interface InputProps {
  fieldName: string;
  type?: string;
  disabled?: boolean;
}

const StyledTextField = styled(TextField)`
  height: 70px;
`;

export const Input = ({ fieldName, type = "text", disabled }: InputProps) => {
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
