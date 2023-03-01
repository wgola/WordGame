import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useEffect, useRef, useState } from "react";
import { Letter } from "../../../types/letter";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { LettersDiv } from "../LettersDiv";
import { SubmitDiv } from "../SubmitDiv";
import { Button } from "../../Button";
import { Tile } from "../../Tile";
import {
  getLetters,
  isPlayerTurn,
  saveCorrectWord,
} from "../../../state/GameSlice";
import { Socket } from "socket.io-client";

const StyledDiv = styled("div")`
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;

export const LettersTile = ({ socket }: { socket: Socket }) => {
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

  const onRender = () => {
    socket.on("wordChecked", (payload) => {
      const message = JSON.parse(payload);
      if (message.correct) dispatch(saveCorrectWord(message));
    });
  };

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) onRender();
    isSecondRender.current = true;
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
