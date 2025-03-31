import { Config } from "../../types";
import { defineMessages } from "react-intl";
import BitcoinWidget from "./Bitcoin";
import BitcoinSettings from "./BitcoinSettings";

const messages = defineMessages({
  name: {
    id: "plugin.bitcoin.name",
    defaultMessage: "Bitcoin Mempool",
    description: "Name of the Bitcoin Mempool widget",
  },
  description: {
    id: "plugin.bitcoin.description",
    defaultMessage: "Get the current block height.",
    description: "Description of the Bitcoin Mempool widget",
  },
});

const config: Config = {
  key: "widget/bitcoin",
  name: messages.name,
  description: messages.description,
  dashboardComponent: BitcoinWidget,
  settingsComponent: BitcoinSettings,
};

export default config;
