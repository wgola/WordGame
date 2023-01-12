import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getLetters,
  isPlayerTurn,
  saveCorrectWord,
} from "../../state/GameSlice";
import { Letter } from "../../types/letter";
import { Button } from "../Button";
import { LettersDiv } from "../LettersDiv";
import { SubmitDiv } from "../SubmitDiv";
import { Tile } from "../Tile";
import { styled } from "@mui/material/styles";
import { MqttMethods } from "../../types/mqttMethods";
import { useParams } from "react-router-dom";

const StyledDiv = styled("div")`
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;

export const LettersTile = ({ publish, subscribe, onMessage }: MqttMethods) => {
  const availableLetters = useAppSelector(getLetters);
  const ifPlayerTurn = useAppSelector(isPlayerTurn);
  const dispatch = useAppDispatch();

  const [showedLetters, setShowedLetters] = useState<Array<Letter>>([]);
  const [answer, setAnswer] = useState("");

  const { gameID } = useParams();

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
    publish(`/game/${gameID}/checkWord`, answer);
    onReset();
  };

  const onWordChecked = (topic: string, payload: Buffer) => {
    if (topic === `/game/${gameID}/wordChecked`) {
      const message = JSON.parse(payload.toString());
      if (message.correct) dispatch(saveCorrectWord(message));
    }
  };

  const onRender = () => {
    subscribe(`/game/${gameID}/wordChecked`);
    onMessage(onWordChecked);
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
