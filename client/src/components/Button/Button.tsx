import { Button as MUIButton, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledButtonProps extends ButtonProps {
  deleteButton?: boolean;
}

const StyledButton = styled(MUIButton, {
  shouldForwardProp: (prop) => prop !== "deleteButton",
})<StyledButtonProps>`
  width: 180px;
  height: 40px;
  ${({ deleteButton }) =>
    deleteButton
      ? "color: red; border-color: red; :hover {border-color: #D84141}"
      : ""}
`;

export const Button = (props: StyledButtonProps) => (
  <StyledButton
    variant="outlined"
    {...props}
    deleteButton={props?.deleteButton}
  />
);
