import { MovableLetter } from "../MovableLetter";
import { styled } from "@mui/material/styles";
import { Letter } from "../../types/letter";

const StyledDiv = styled("div")`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  height: 57px;
`;

const MessageDiv = styled("div")`
  padding: 13px;
  border-right: 1px solid black;
  font-size: 18px;
  width: 160px;
`;

interface LettersDivProps {
  letters: Array<Letter>;
}

export const LettersDiv = ({ letters }: LettersDivProps) => {
  return (
    <StyledDiv>
      <MessageDiv>Available letters</MessageDiv>
      {letters.map((letter, index) => (
        <MovableLetter key={index} letter={letter} />
      ))}
    </StyledDiv>
  );
};