import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface TileProps {
  width?: number;
  height?: number;
  children?: ReactNode;
  dontAddMargin?: boolean;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "width" && prop !== "dontAddMargin" && prop !== "height",
})<TileProps>`
  border-radius: 25px;
  padding: 40px;
  width: ${({ width }) => `${width}px`};
  ${({ height }) => (height ? `height: ${height}px;` : "")}
  background-color: #fffff0;
  margin: ${({ dontAddMargin }) => (dontAddMargin ? "auto" : "70px auto")};
`;

export const Tile = ({ width, children, dontAddMargin, height }: TileProps) => (
  <StyledDiv width={width} dontAddMargin={dontAddMargin} height={height}>
    {children}
  </StyledDiv>
);
