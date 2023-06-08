import { addNewLog, getInfoLogs } from "../../../state/GameSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteGame } from "../../../api/gameAPI/deleteGame";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import { Tile } from "../../Tile";
import { Socket } from "socket.io-client";

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

export const GameMessageDiv = ({ socket }: { socket: Socket }) => {
  const { gameID } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const messages = useAppSelector(getInfoLogs);

  const messageDiv = useRef<HTMLDivElement>(null);

  const deleteCurrentGame = (seconds: number) =>
    setTimeout(async () => {
      try {
        await deleteGame(gameID);

        navigate("/home/play");
      } catch (e) {
        navigate("/home/play");
      }
    }, seconds * 1000);

  const onRender = () => {
    if (messageDiv) {
      messageDiv.current?.addEventListener("DOMNodeInserted", (event) => {
        messageDiv.current?.scroll({
          top: messageDiv.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    socket.on("info", (payload) => dispatch(addNewLog(payload)));
    socket.on("endGame", (payload) => {
      const seconds = parseInt(payload);
      dispatch(addNewLog(`This game will be deleted in ${seconds} seconds...`));
      deleteCurrentGame(seconds);
    });
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
