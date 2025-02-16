import { Config } from "../../types";
import Wikimedia from "./Wikimedia";
import Apod from "./Wikimedia";
import WikimediaSettings from "./WikimediaSettings";
import ApodSettings from "./WikimediaSettings";

const config: Config = {
  key: "background/wikimedia",
  name: "Wikimedia Image of the Day",
  description: "Get the image of the day from Wikimedia Commons.",
  dashboardComponent: Wikimedia,
  settingsComponent: WikimediaSettings,
  supportsBackdrop: true,
};

export default config;
