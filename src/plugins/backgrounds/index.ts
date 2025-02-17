import colour from "./colour";
import gradient from "./gradient";
import media from "./media";
import online from "./online";
import unsplash from "./unsplash";
import giphy from "./giphy";
import apod from "./apod";
import wikimedia from "./wikimedia";

export const backgroundConfigs = [
  colour,
  giphy,
  gradient,
  media,
  online,
  unsplash,
  apod,
  wikimedia,
];

backgroundConfigs.sort((a, b) => a.name.localeCompare(b.name));
