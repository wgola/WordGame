import io from "socket.io-client";

const [serverProtocol, serverAddress] = import.meta.env.VITE_BACKEND_URL.split(
  ":"
);

const wsProtocl = serverProtocol === "https" ? "wss" : "ws";

const socket = io(`${wsProtocl}:${serverAddress}`, {
  autoConnect: false,
});

export default socket;
