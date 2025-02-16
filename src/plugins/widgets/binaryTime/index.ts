import { Config } from "../../types";
import Time from "./BinaryTime";
import TimeSettings from "./BinaryTimeSettings";

const config: Config = {
  key: "widget/binarytime",
  name: "Binary Clock",
  description: "Be on Time in Binary.",
  dashboardComponent: Time,
  settingsComponent: TimeSettings,
};

export default config;
