import { Button as MUIButton, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MUIButton)`
  width: 180px;
  height: 40px;
`;

export const Button = (props: ButtonProps) => (
  <StyledButton variant="outlined" {...props} />
);
