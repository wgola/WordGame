import { styled } from "@mui/material/styles";

interface MessageDivProps {
  ownMessage: boolean;
  children: string;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "ownMessage",
})<MessageDivProps>`
  border: 1px solid grey;
  border-radius: 15px;
  width: 50%;
  align-self: ${({ ownMessage }) => (ownMessage ? "flex-end" : "flex-start")};
  padding: 10px;
  margin: 5px;
  background-color: ${({ ownMessage }) => (ownMessage ? "grey" : "cyan")};
`;

export const MessageDiv = ({ ownMessage, children }: MessageDivProps) => (
  <StyledDiv ownMessage={ownMessage}>{children}</StyledDiv>
);
