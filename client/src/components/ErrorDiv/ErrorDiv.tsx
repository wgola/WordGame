import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface ErrorDivProps {
  children?: ReactNode;
}

const StyledDiv = styled("div")`
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: red;
`;

export const ErrorDiv = ({ children }: ErrorDivProps) => (
  <StyledDiv>{children}</StyledDiv>
);
