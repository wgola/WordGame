import io from "socket.io-client";

const [serverProtocol, serverAddress, serverPort] =
  import.meta.env.VITE_BACKEND_URL.split(":");

const wsProtocl = serverProtocol === "https" ? "wss" : "ws";

const socket = io(`${wsProtocl}:${serverAddress}:${serverPort}`, {
  autoConnect: false,
});

export default socket;
