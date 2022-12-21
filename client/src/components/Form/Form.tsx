import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  onSubmit?: any;
}

const StyledForm = styled("form")`
  border-radius: 25px;
  padding: 40px;
  gap: 30px;
  width: 500px;
  background-color: #fffff0;
  margin: 70px auto;
  display: flex;
  flex-direction: column;
`;

export const Form = ({ children, onSubmit }: FormProps) => (
  <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
);
