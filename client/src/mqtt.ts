import mqtt from "precompiled-mqtt";
import { addOpponent } from "./state/GameSlice";
import { store } from "./store";

const mqttConnect = (gameID: string) => {
  const client = mqtt.connect("ws://localhost:9000/mqtt");

  client.on("connect", () => {
    client.publish(
      `game/${gameID}/connected`,
      JSON.stringify(store.getState().gameData.opponent)
    );
  });

  client.subscribe(`game/${gameID}/connected`);

  client.on("message", (topic: string, payload: Buffer) => {
    const data = JSON.parse(payload.toString());
    switch (topic) {
      case `game/${gameID}/connected`: {
        if (store.getState().gameData.opponent.userID === "")
          store.dispatch(addOpponent(data));
      }
    }
  });
};

export default mqttConnect;
