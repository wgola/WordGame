import { Avatar as MUIAvatar } from "@mui/material";
import { styled } from "@mui/material/styles";

interface AvatarProps {
  color: string;
  size: number;
  children: string;
}

const StyledAvatar = styled(MUIAvatar, {
  shouldForwardProp: (prop) => prop !== "size" && prop !== "color",
})<AvatarProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: ${({ color }) => color};
`;

export const Avatar = ({ color, children, size }: AvatarProps) => (
  <StyledAvatar size={size} color={color}>
    {children.substring(0, 2)}
  </StyledAvatar>
);
