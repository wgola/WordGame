import { styled } from "@mui/material/styles";
import { FormEventHandler, ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const StyledForm = styled("form")`
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

export const Form = ({ children, onSubmit }: FormProps) => (
  <StyledForm onSubmit={onSubmit} autoComplete="off">
    {children}
  </StyledForm>
);
