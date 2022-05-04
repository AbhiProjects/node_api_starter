import * as path from "path";
import * as fs from "fs";

const winston = require("winston");
const { format } = require("logform");

const logFolder: string = path.join(__dirname, "..", "log");
const logFileName: string = "app.log";

// Create a "log" folder in the output directory if it does not exist
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}

const winstonConfig = {
  file: {
    level: "debug",
    handleExceptions: true,
    json: true,
    filename: path.join(logFolder, logFileName),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
  },
};

const logger = winston.createLogger({
  format: format.combine(format.errors({ stack: true }), format.json()),
  transports: [
    new winston.transports.File(winstonConfig.file),
    new winston.transports.Console(winstonConfig.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export { logger };
