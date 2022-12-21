import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface TileProps {
  children?: ReactNode;
  width: number;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "width",
})<TileProps>`
  border-radius: 25px;
  padding: 40px;
  width: ${({ width }) => `${width}px`};
  background-color: #fffff0;
  margin: 70px auto;
`;

export const Tile = ({ children, width }: TileProps) => (
  <StyledDiv width={width}>{children}</StyledDiv>
);
