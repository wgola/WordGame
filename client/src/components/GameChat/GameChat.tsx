import { OnMessageCallback } from "precompiled-mqtt";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getUser } from "../../state/UserSlice";
import { Message } from "../../types/message";
import { Tile } from "../Tile";
import { MessageForm } from "./MessageForm";
import { styled } from "@mui/material/styles";
import { MessageDiv } from "./MessageDiv";

const ChatDiv = styled("div")`
  border: 1px solid grey;
  border-radius: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

interface GameChatProps {
  publish: (topic: string, message: string) => void;
  subscribe: (topic: string) => void;
  onMessage: (callback: OnMessageCallback) => void;
}

export const GameChat = ({ publish, subscribe, onMessage }: GameChatProps) => {
  const user = useAppSelector(getUser);
  const { gameID } = useParams();

  const [messages, setMessages] = useState<Array<Message>>([]);

  const messageDiv = useRef<HTMLDivElement>(null);
  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) {
      if (messageDiv) {
        messageDiv.current?.addEventListener("DOMNodeInserted", (event) => {
          messageDiv.current?.scroll({
            top: messageDiv.current.scrollHeight,
            behavior: "smooth",
          });
        });
      }
      subscribe(`game/${gameID}/chat`);
      onMessage((topic: string, payload: Buffer) => {
        if (topic === `game/${gameID}/chat`) {
          const message = JSON.parse(payload.toString());
          setMessages((messages) => [...messages, message]);
        }
      });
    }
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
