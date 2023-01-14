import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)`
  width: 160px;
`;

export const Input = (props: TextFieldProps) => {
  return (
    <StyledInput
      variant="outlined"
      size="small"
      {...props}
      autoComplete="off"
    />
  );
};
