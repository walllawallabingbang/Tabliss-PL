import countdown from "./countdown";
import since from "./since";
import bitcoin from "./bitcoin";
import css from "./css";
import github from "./github";
import greeting from "./greeting";
import html from "./html";
import ipInfo from "./ipInfo";
import js from "./js";
import links from "./links";
import literatureClock from "./literatureClock";
import message from "./message";
// import nba from "./nba";  TODO: FIX (IT'S BROKEN)
import notes from "./notes";
// import randomMessage from "./randomMessage"; removed, use customText
import nba from "./nba";
import quote from "./quote";
import search from "./search";
import time from "./time";
import todo from "./todo";
import weather from "./weather";
import workHours from "./workHours";
import joke from "./joke";
import customText from "./customText";
import bookmarks from "./bookmarks";
import binarytime from "./binaryTime";
import topSites from "./topSites";

export const widgetConfigs = [
  binarytime,
  bitcoin,
  countdown,
  css,
  customText,
  github,
  greeting,
  html,
  ipInfo,
  joke,
  links,
  literatureClock,
  message,
  // nba,
  nba,
  notes,
  quote,
  search,
  since,
  time,
  todo,
  weather,
  workHours,
];

if (BUILD_TARGET === "web") {
  widgetConfigs.push(js);
}
if (BUILD_TARGET != "web") {
  widgetConfigs.push(topSites);
  widgetConfigs.push(bookmarks);
}

widgetConfigs.sort((a, b) => a.name.localeCompare(b.name));
