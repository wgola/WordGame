import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { getLetters } from "../../state/GameSlice";
import { Letter } from "../../types/letter";
import { Button } from "../Button";
import { LettersDiv } from "../LettersDiv";
import { SubmitDiv } from "../SubmitDiv";
import { Tile } from "../Tile";
import { styled } from "@mui/material/styles";

const StyledDiv = styled("div")`
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;

export const LettersTile = () => {
  const availableLetters = useAppSelector(getLetters);

  const [showedLetters, setShowedLetters] = useState<Array<Letter>>([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => setShowedLetters(availableLetters), [availableLetters]);

  const onDrop = (letter: Letter) => {
    setShowedLetters((letters) =>
      letters.filter((element) => element.id !== letter.id)
    );
    setAnswer(answer + letter.letter);
  };

  const onReset = () => {
    setShowedLetters(availableLetters);
    setAnswer("");
  };

  const onSubmit = () => {
    console.log(answer);
    onReset();
  };

  return (
    <Tile dontAddMargin={true}>
      <LettersDiv letters={showedLetters} />
      <SubmitDiv answer={answer} onDrop={onDrop} />
      <StyledDiv>
        <Button onClick={onReset} children="Reset" />
        <Button onClick={onSubmit} children="Submit" />
      </StyledDiv>
    </Tile>
  );
};
