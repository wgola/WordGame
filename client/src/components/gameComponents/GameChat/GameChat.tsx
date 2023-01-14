import { MqttMethods } from "../../../types/mqttMethods";
import { useEffect, useRef, useState } from "react";
import { getUser } from "../../../state/UserSlice";
import { Message } from "../../../types/message";
import { useAppSelector } from "../../../hooks";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { MessageForm } from "./MessageForm";
import { MessageDiv } from "./MessageDiv";
import { Tile } from "../../Tile";

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
