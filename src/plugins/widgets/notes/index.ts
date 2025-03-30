import { Config } from "../../types";
import { Notes } from "./Notes";
import NotesSettings from "./NotesSettings";

const config: Config = {
  key: "widget/notes",
  name: "Notes",
  description: "Jot something down.",
  dashboardComponent: Notes,
  settingsComponent: NotesSettings,
};

export default config;
