import { Button as MUIButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ButtonProps {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: any;
  disabled?: boolean;
}

const StyledButton = styled(MUIButton)`
  width: 180px;
`;

export const Button = ({ name, type, onClick, disabled }: ButtonProps) => (
  <StyledButton
    variant="outlined"
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {name}
  </StyledButton>
);
