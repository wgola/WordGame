import mqtt, { OnMessageCallback } from "precompiled-mqtt";
import { addOpponent } from "./state/GameSlice";
import { store } from "./store";

const mqttConnect = (connectedTopic: string) => {
  const client = mqtt.connect("ws://localhost:9000/mqtt");

  client.subscribe(connectedTopic);

  client.on("message", (topic: string, payload: Buffer) => {
    const data = payload.toString();
    if (topic === connectedTopic) {
      const message = JSON.parse(data);
      if (store.getState().gameData.opponent.userID === "")
        store.dispatch(addOpponent(message));
    }
  });

  const publish = (topic: string, message: string) => {
    client.publish(topic, message);
  };

  const subscribe = (topic: string) => {
    client.subscribe(topic);
  };

  const onMessage = (callback: OnMessageCallback) => {
    client.on("message", callback);
  };

  return { publish, subscribe, onMessage };
};

export default mqttConnect;
