import { useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";
import { Letter } from "../../types/letter";

const StyledDiv = styled("div")`
  display: flex;
  border: 1px solid grey;
  border-radius: 10px;
  height: 57px;
`;

const StyledLetter = styled("div")`
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 15px;
  margin: 7.5px;
  background-color: white;
  font-weight: bold;
`;

const MessageDiv = styled("div")`
  padding: 13px;
  border-right: 1px solid grey;
  font-size: 18px;
  width: 160px;
`;

interface DropDivProps {
  canDrop: boolean;
}

const DropDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "canDrop",
})<DropDivProps>`
  display: flex;
  width: 610px;
  border-radius: 10px;
  background-color: ${({ canDrop }) => (canDrop ? "blanchedalmond	" : "")};
`;

interface SubmitDivProps {
  answer: string;
  onDrop: (letter: Letter) => void;
}

export const SubmitDiv = ({ answer, onDrop }: SubmitDivProps) => {
  const [{ canDrop }, drop] = useDrop({
    accept: "letter",
    drop: (item: Letter, monitor) => onDrop(item),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <StyledDiv>
      <MessageDiv>Answer</MessageDiv>
      <DropDiv ref={drop} canDrop={canDrop}>
        {Array.from(answer).map((letter, index) => (
          <StyledLetter key={index}>{letter}</StyledLetter>
        ))}
      </DropDiv>
    </StyledDiv>
  );
};
