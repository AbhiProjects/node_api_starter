import { Server } from "net";
import { app } from "./app";
import { logger } from "./config";

const PORT: string = process.env.PORT || "5000";

const server: Server = app.listen(PORT, () => {
  logger.info(`Application listening on port ${PORT}`);
});

server.on("error", onError);
server.on("listening", onListening);

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error("Appliction requires elevated privileges");
      break;
    case "EADDRINUSE":
      logger.error("Port is already in use");
      break;
    default:
      throw error;
  }

  logger.error("--- FULL ERROR: ---");
  logger.error(error);

  process.exit(1);
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;

  const serverDetails = {
    Server: {
      adr: addr,
      bind: bind,
    },
  };

  logger.debug(serverDetails);
}
