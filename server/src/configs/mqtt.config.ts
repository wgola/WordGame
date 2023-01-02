import mqtt from "mqtt";

const mqttConnect = () => {
  const client = mqtt.connect(process.env.MQTT_CONNECTION);
  client.on("connect", () => console.log("Connected to MQTT broker"));
  return client;
};

export default mqttConnect;
