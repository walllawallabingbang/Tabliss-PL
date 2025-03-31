import { Config } from "../../types";
import { defineMessages } from "react-intl";
import BinaryTime from "./BinaryTime";
import BinaryTimeSettings from "./BinaryTimeSettings";

const messages = defineMessages({
  name: {
    id: "plugin.binaryTime.name",
    defaultMessage: "Binary Clock",
    description: "Name of the Binary Clock widget",
  },
  description: {
    id: "plugin.binaryTime.description",
    defaultMessage: "Display time in binary format.",
    description: "Description of the Binary Clock widget",
  },
});

const config: Config = {
  key: "widget/binaryTime",
  name: messages.name,
  description: messages.description,
  dashboardComponent: BinaryTime,
  settingsComponent: BinaryTimeSettings,
};

export default config;
