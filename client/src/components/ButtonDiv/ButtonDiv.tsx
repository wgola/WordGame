import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface ButtonDivProps {
  children?: ReactNode;
}

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ButtonDiv = ({ children }: ButtonDivProps) => (
  <StyledDiv>{children}</StyledDiv>
);
