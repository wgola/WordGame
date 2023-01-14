import mqtt from "mqtt";
import log from "./logs.config";

const mqttConnect = () => {
  const client = mqtt.connect(process.env.MQTT_CONNECTION);
  client.on("connect", () => log.info("Connected to MQTT broker"));
  return client;
};

export default mqttConnect;
