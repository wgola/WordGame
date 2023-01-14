import { guessedWord } from "../../../types/guessedWord";
import { styled } from "@mui/material/styles";

const StyledLetterDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 15px;
`;

const StyledWordDiv = styled("div")`
  display: flex;
  gap: 5px;
`;

interface BoardWordProps {
  boardWord: guessedWord;
}

export const BoardWord = ({ boardWord }: BoardWordProps) => {
  const divsFromWord = [];
  for (let i = 0; i < boardWord.length; i++) {
    const letterDiv = (
      <StyledLetterDiv key={i}>{boardWord.word[i] || ""}</StyledLetterDiv>
    );
    divsFromWord.push(letterDiv);
  }
  return <StyledWordDiv>{...divsFromWord}</StyledWordDiv>;
};
