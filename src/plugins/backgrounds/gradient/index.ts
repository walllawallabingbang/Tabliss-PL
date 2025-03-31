import { Config } from "../../types";
import { defineMessages } from "react-intl";
import Gradient from "./Gradient";
import GradientSettings from "./GradientSettings";

const messages = defineMessages({
  name: {
    id: "background.gradient.name",
    defaultMessage: "Colour Gradient",
    description: "Name of the Colour Gradient background",
  },
  description: {
    id: "background.gradient.description",
    defaultMessage: "Add more splashes of colour.",
    description: "Description of the Colour Gradient background",
  },
});

const config: Config = {
  key: "background/gradient",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Gradient,
  settingsComponent: GradientSettings,
};

export default config;
