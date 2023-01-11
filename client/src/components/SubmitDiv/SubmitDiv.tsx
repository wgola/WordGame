import { useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";
import { Letter } from "../../types/letter";

const StyledDiv = styled("div")`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  height: 57px;
`;

const StyledLetter = styled("div")`
  border: 1px solid black;
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
  border-right: 1px solid black;
  font-size: 18px;
  width: 160px;
`;

interface SubmitDivProps {
  answer: string;
  onDrop: (letter: Letter) => void;
}

export const SubmitDiv = ({ answer, onDrop }: SubmitDivProps) => {
  const [, drop] = useDrop({
    accept: "letter",
    drop: (item: Letter, monitor) => onDrop(item),
  });

  return (
    <StyledDiv ref={drop}>
      <MessageDiv>Answer</MessageDiv>
      {Array.from(answer).map((letter, index) => (
        <StyledLetter key={index}>{letter}</StyledLetter>
      ))}
    </StyledDiv>
  );
};
