import mqtt, { OnMessageCallback } from "precompiled-mqtt";

const mqttConnect = () => {
  const connection =
    process.env.NODE_ENV === "development" ? "ws://mqtt-broker:9000/mqtt" : "";

  const client = mqtt.connect("ws://localhost:9000/mqtt");

  const publish = (topic: string, message: string) => {
    client.publish(topic, message);
  };

  const subscribe = (topic: string | Array<string>) => {
    client.subscribe(topic);
  };

  const onMessage = (callback: OnMessageCallback) => {
    client.on("message", callback);
  };

  return { publish, subscribe, onMessage };
};

export default mqttConnect;
