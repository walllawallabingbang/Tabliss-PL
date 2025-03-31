import { Config } from "../../types";
import { defineMessages } from "react-intl";
import Countdown from "./Countdown";
import CountdownSettings from "./CountdownSettings";

const messages = defineMessages({
  name: {
    id: "plugin.countdown.name",
    defaultMessage: "Countdown",
    description: "Name of the Countdown widget",
  },
  description: {
    id: "plugin.countdown.description",
    defaultMessage: "Literally counting down the days.",
    description: "Description of the Countdown widget",
  },
});

const config: Config = {
  key: "widget/countdown",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Countdown,
  settingsComponent: CountdownSettings,
};

export default config;
