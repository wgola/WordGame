import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IDInputProps {
  onChange?: any;
  label?: string;
  required?: true;
}

const StyledInput = styled(TextField)`
  width: 160px;
`;

export const Input = ({ onChange, label, required }: IDInputProps) => {
  return (
    <StyledInput
      variant="outlined"
      label={label}
      required={required}
      size="small"
      onChange={onChange}
    />
  );
};
