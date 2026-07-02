/* eslint-disable no-console */
import config from "../../config";

export const logger = (...messages: any[]) => {
  if (config.env === "local" || config.env === "dev" || config.env === "qa") {
    console.log(messages);
  }
};

export const logError = (...messages: any[]) => {
  if (config.env === "local" || config.env === "dev" || config.env === "qa") {
    console.error(messages);
  }
};
