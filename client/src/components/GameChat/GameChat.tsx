import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getUser } from "../../state/UserSlice";
import { Message } from "../../types/message";
import { Tile } from "../Tile";
import { MessageForm } from "./MessageForm";
import { styled } from "@mui/material/styles";
import { MessageDiv } from "./MessageDiv";
import { MqttMethods } from "../../types/mqttMethods";

const StyledDiv = styled("div")`
  border: 1px solid grey;
  border-radius: 15px;
`;

const TitledDiv = styled("div")`
  font-style: italic;
  text-align: center;
  border-radius: 15px;
  border-bottom: 1px solid grey;
`;

const ChatDiv = styled("div")`
  height: 214px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const GameChat = ({ publish, subscribe, onMessage }: MqttMethods) => {
  const user = useAppSelector(getUser);
  const { gameID } = useParams();

  const [messages, setMessages] = useState<Array<Message>>([]);

  const chatDiv = useRef<HTMLDivElement>(null);

  const onChatMessage = (topic: string, payload: Buffer) => {
    if (topic === `/game/${gameID}/chat`) {
      const message = JSON.parse(payload.toString());
      setMessages((messages) => [...messages, message]);
    }
  };

  const onRender = () => {
    if (chatDiv) {
      chatDiv.current?.addEventListener("DOMNodeInserted", (event) => {
        chatDiv.current?.scroll({
          top: chatDiv.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    subscribe(`/game/${gameID}/chat`);
    onMessage(onChatMessage);
  };

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) onRender();
    isSecondRender.current = true;
  }, []);

  return (
    <Tile dontAddMargin={true}>
      <StyledDiv>
        <TitledDiv>Welcome to chat!</TitledDiv>
        <ChatDiv ref={chatDiv}>
          {messages.map((message, index) => (
            <MessageDiv
              key={index}
              ownMessage={message.author === user.username}
              children={message.body}
            />
          ))}
        </ChatDiv>
      </StyledDiv>
      <MessageForm publish={publish} />
    </Tile>
  );
};
