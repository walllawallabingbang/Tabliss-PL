import { Config } from "../../types";
import { defineMessages } from "react-intl";
import Quote from "./Quote";
import QuoteSettings from "./QuoteSettings";

const messages = defineMessages({
  name: {
    id: "plugin.quote.name",
    defaultMessage: "Quotes",
    description: "Name of the Quote widget",
  },
  description: {
    id: "plugin.quote.description",
    defaultMessage: "Be inspired (or not, there's categories).",
    description: "Description of the Quote widget",
  },
});

const config: Config = {
  key: "widget/quote",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Quote,
  settingsComponent: QuoteSettings,
};

export default config;
