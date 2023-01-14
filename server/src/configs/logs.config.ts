import { createSimpleLogger, ISimpleLoggerOptions } from "simple-node-logger";

const options = {
  logFilePath: "scrabble_logs.log",
};

const log = createSimpleLogger(options);

export default log;
