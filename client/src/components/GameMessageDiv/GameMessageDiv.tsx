import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MqttMethods } from "../../types/mqttMethods";
import { Tile } from "../Tile";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addNewLog, getInfoLogs } from "../../state/GameSlice";

const StyledDiv = styled("div")`
  border: 1px solid grey;
  border-radius: 15px;
`;

const TitleDiv = styled("div")`
  font-style: italic;
  text-align: center;
  border-bottom: 1px solid grey;
  border-radius: 15px;
`;

const StyledInfoDiv = styled("div")`
  overflow-y: auto;
  height: 100px;
`;

export const GameMessageDiv = ({ subscribe, onMessage }: MqttMethods) => {
  const { gameID } = useParams();

  const dispatch = useAppDispatch();
  const messages = useAppSelector(getInfoLogs);

  const infoTopic = `/game/${gameID}/info`;

  const messageDiv = useRef<HTMLDivElement>(null);

  const onNewMessage = (topic: string, payload: Buffer) => {
    if (topic === infoTopic) dispatch(addNewLog(payload.toString()));
  };

  const onRender = () => {
    if (messageDiv) {
      messageDiv.current?.addEventListener("DOMNodeInserted", (event) => {
        messageDiv.current?.scroll({
          top: messageDiv.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    subscribe(infoTopic);
    onMessage(onNewMessage);
  };

  const isSecondRef = useRef(false);
  useEffect(() => {
    if (isSecondRef.current) onRender();
    isSecondRef.current = true;
  }, []);

  return (
    <Tile dontAddMargin={true}>
      <StyledDiv>
        <TitleDiv>Game info</TitleDiv>
        <StyledInfoDiv ref={messageDiv}>
          <ul>
            {messages.map((mes, ind) => (
              <li key={ind}>{mes}</li>
            ))}
          </ul>
        </StyledInfoDiv>
      </StyledDiv>
    </Tile>
  );
};
