import { backgroundConfigs } from "./backgrounds";
import { widgetConfigs } from "./widgets";
export { backgroundConfigs } from "./backgrounds";
export { widgetConfigs } from "./widgets";

import Unknown from "./widgets/unknown/Unknown";
import UnknownSettings from "./widgets/unknown/UnknownSettings";

const configs = [...backgroundConfigs, ...widgetConfigs];

export function getConfig(key: string) {
  const config = configs.find((config) => config.key === key);

  if (!config) {
    console.warn(`Unable to find config for plugin: ${key}`);
    return {
      key: "widget/unknown",
      name: `Unknown Widget ${key}`,
      description: `Something went wrong while loading '${key}' (click for details)`,
      dashboardComponent: Unknown,
      settingsComponent: UnknownSettings,
      supportsBackdrop: false,
    };
  }

  return config;
}
