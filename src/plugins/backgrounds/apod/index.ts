import { Config } from "../../types";
import { defineMessages } from "react-intl";
import Apod from "./Apod";
import ApodSettings from "./ApodSettings";

const messages = defineMessages({
  name: {
    id: "background.apod.name",
    defaultMessage: "Astronomy Picture of the Day",
    description: "Name of the APOD background",
  },
  description: {
    id: "background.apod.description",
    defaultMessage: "NASA's sky pictures",
    description: "Description of the APOD background",
  },
});

const config: Config = {
  key: "background/apod",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Apod,
  settingsComponent: ApodSettings,
  supportsBackdrop: true,
};

export default config;
