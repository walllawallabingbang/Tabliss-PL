import { Config } from "../../types";
import { defineMessages } from "react-intl";
import GitHubCalendarWidget from "./GitHub";
import GitHubSettings from "./GitHubSettings";

const messages = defineMessages({
  name: {
    id: "plugin.github.name",
    defaultMessage: "GitHub Feed",
    description: "Name of the GitHub Feed widget",
  },
  description: {
    id: "plugin.github.description",
    defaultMessage: "Display your GitHub activity and notifications.",
    description: "Description of the GitHub Feed widget",
  },
});

const config: Config = {
  key: "widget/github",
  name: messages.name,
  description: messages.description,
  dashboardComponent: GitHubCalendarWidget,
  settingsComponent: GitHubSettings,
};

export default config;
