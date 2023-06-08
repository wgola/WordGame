import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Letter } from "../../../types/letter";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { LettersDiv } from "../LettersDiv";
import { SubmitDiv } from "../SubmitDiv";
import { Button } from "../../Button";
import { Tile } from "../../Tile";
import {
  getLetters,
  isPlayerTurn,
  saveCorrectWord,
} from "../../../state/GameSlice";
import socket from "../../../ws";

const StyledDiv = styled("div")`
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;

export const LettersTile = () => {
  const availableLetters = useAppSelector(getLetters);
  const ifPlayerTurn = useAppSelector(isPlayerTurn);
  const dispatch = useAppDispatch();

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
    socket.emit("checkWord", answer);
    onReset();
  };

  useEffect(() => {
    const onWordChecked = (payload: string) => {
      const message = JSON.parse(payload);
      if (message.correct) dispatch(saveCorrectWord(message));
    };

    socket.on("wordChecked", onWordChecked);

    return () => {
      socket.off("wordChecked", onWordChecked);
    };
  }, []);

  return (
    <Tile dontAddMargin={true}>
      <LettersDiv letters={showedLetters} />
      <SubmitDiv answer={answer} onDrop={onDrop} />
      <StyledDiv>
        <Button onClick={onReset} children="Reset" />
        <Button
          onClick={onSubmit}
          children="Submit"
          disabled={answer.length < 2 || !ifPlayerTurn}
        />
      </StyledDiv>
    </Tile>
  );
};
