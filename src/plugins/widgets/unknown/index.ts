import { Config } from "../../types";
import { defineMessages } from "react-intl";
import Unknown from "./Unknown";
import UnknownSettings from "./UnknownSettings";

const messages = defineMessages({
  name: {
    id: "plugin.unknown.name",
    defaultMessage: "Unknown Widget",
    description: "Name of the Unknown Widget",
  },
  description: {
    id: "plugin.unknown.description",
    defaultMessage: "Something went wrong.",
    description: "Description of the Unknown Widget",
  },
});

const config: Config = {
  key: "widget/unknown",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Unknown,
  settingsComponent: UnknownSettings,
  supportsBackdrop: false,
};

export default config;
