import express from "express";
import { json, urlencoded } from "body-parser";
import { apiRouter } from "./routes";
import { logger } from "./config";

const ENV = process.env.NODE_ENV || "development";

const app: express.Application = express();
const cookieParser = require("cookie-parser");

// Body parser cconfiguration
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie parsing

// Log every request
app.use(function (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const logObject = {
    date: new Date(),
    url: request.url,
    original_url: request.originalUrl,
    method: request.method,
    headers: request.headers,
    body: request.body,
  };

  //logger.info(logObject);

  next();
});

// Routes
app.use("/api", apiRouter);

// Handle 404 (Page not found) error
app.use(function (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const logObject = {
    date: new Date(),
    url: request.url,
    original_url: request.originalUrl,
    method: request.method,
    status: 404,
    errorMessage: "Page not found",
  };

  logger.error(logObject);

  response.status(404);
  response.json({
    message: "Page not found",
  });
});

// Error Handler
app.use(
  (
    error: any,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const logObject = {
      date: new Date(),
      ip: request.ips,
      url: request.url,
      original_url: request.originalUrl,
      method: request.method,
      status: error.status || 500,
      errorMessage: error.message,
      errorStack: error.stack,
    };

    logger.error(logObject);

    response.status(error.status || 500);
    response.json({
      error: {},
      message: "There was an error in processing your request",
    });
  }
);

export { app };
