import { Config } from "../../types";
import { defineMessages } from "react-intl";
import Bookmarks from "./Bookmarks";
import BookmarksSettings from "./BookmarksSettings";

const messages = defineMessages({
  name: {
    id: "plugin.bookmarks.name",
    defaultMessage: "Bookmarks",
    description: "Name of the Bookmarks widget",
  },
  description: {
    id: "plugin.bookmarks.description",
    defaultMessage: "Quick access to your browser bookmarks.",
    description: "Description of the Bookmarks widget",
  },
});

const config: Config = {
  key: "widget/bookmarks",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Bookmarks,
  settingsComponent: BookmarksSettings,
};

export default config;
