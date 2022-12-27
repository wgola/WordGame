import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)`
  width: 160px;
`;

export const IDInput = () => {
  return (
    <StyledInput
      variant="outlined"
      label="Enter game ID"
      required={true}
      size="small"
    />
  );
};
