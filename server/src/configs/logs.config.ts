import { createSimpleLogger } from "simple-node-logger";

const options = {
  logFilePath: "wordgame_logs.log",
};

const log = createSimpleLogger(options);

export default log;
