import { Config } from "../../types";
import { defineMessages } from "react-intl";
import Colour from "./Colour";
import ColourSettings from "./ColourSettings";

const messages = defineMessages({
  name: {
    id: "background.colour.name",
    defaultMessage: "Solid Colour",
    description: "Name of the Solid Colour background",
  },
  description: {
    id: "background.colour.description",
    defaultMessage: "Add a splash of colour.",
    description: "Description of the Solid Colour background",
  },
});

const config: Config = {
  key: "background/colour",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Colour,
  settingsComponent: ColourSettings,
};

export default config;
