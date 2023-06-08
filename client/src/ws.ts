import io from "socket.io-client";

const wsURL =
  process.env.NODE_ENV === "development" ? "ws://localhost:8000/" : "";

const socket = io(wsURL);

export default socket;
