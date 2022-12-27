import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IDInputProps {
  onChange?: any;
}

const StyledInput = styled(TextField)`
  width: 160px;
`;

export const IDInput = ({ onChange }: IDInputProps) => {
  return (
    <StyledInput
      variant="outlined"
      label="Enter game ID"
      required={true}
      size="small"
      onChange={onChange}
    />
  );
};
