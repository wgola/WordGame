import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  onSubmit?: any;
}

const StyledForm = styled("form")`
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

export const Form = ({ children, onSubmit }: FormProps) => (
  <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
);
