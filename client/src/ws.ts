import io from "socket.io-client";

const socket = io(`ws:${import.meta.env.VITE_BACKEND_URL.split(":")[1]}`, {
  autoConnect: false,
});

export default socket;
