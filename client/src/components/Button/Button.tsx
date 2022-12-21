import { Button as MUIButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ButtonProps {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
}

const StyledButton = styled(MUIButton)`
  width: 180px;
`;

export const Button = ({ name, type }: ButtonProps) => (
  <StyledButton variant="outlined" type={type}>
    {name}
  </StyledButton>
);
