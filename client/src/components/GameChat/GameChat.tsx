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

const ChatDiv = styled("div")`
  border: 1px solid grey;
  border-radius: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const GameChat = ({ publish, subscribe, onMessage }: MqttMethods) => {
  const user = useAppSelector(getUser);
  const { gameID } = useParams();

  const [messages, setMessages] = useState<Array<Message>>([]);

  const messageDiv = useRef<HTMLDivElement>(null);

  const onChatMessage = (topic: string, payload: Buffer) => {
    if (topic === `game/${gameID}/chat`) {
      const message = JSON.parse(payload.toString());
      setMessages((messages) => [...messages, message]);
    }
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
    subscribe(`game/${gameID}/chat`);
    onMessage(onChatMessage);
  };

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) onRender();
    isSecondRender.current = true;
  }, []);

  return (
    <Tile dontAddMargin={true}>
      <h2>Chat</h2>
      <ChatDiv ref={messageDiv}>
        {messages.map((message, index) => (
          <MessageDiv
            key={index}
            ownMessage={message.author === user.username}
            children={message.body}
          />
        ))}
      </ChatDiv>
      <MessageForm publish={publish} />
    </Tile>
  );
};
