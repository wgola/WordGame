import { OnMessageCallback } from "precompiled-mqtt";

export interface MqttMethods {
  publish: (topic: string, message: string) => void;
  subscribe: (topic: string | Array<string>) => void;
  onMessage: (callback: OnMessageCallback) => void;
}
