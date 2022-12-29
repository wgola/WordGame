import { Avatar as MUIAvatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getFontColor } from "../../utils";

interface AvatarProps {
  color: string | undefined;
  size: number;
  children: string | undefined;
}

const StyledAvatar = styled(MUIAvatar, {
  shouldForwardProp: (prop) => prop !== "size" && prop !== "color",
})<AvatarProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: ${({ color }) => color};
  color: ${({ color }) => (color ? getFontColor(color) : "black")};
  font-size: ${({ size }) => `${size / 2.5}px`};
`;

export const Avatar = ({ color, children, size }: AvatarProps) => (
  <StyledAvatar size={size} color={color}>
    {children && children.substring(0, 2)}
  </StyledAvatar>
);
