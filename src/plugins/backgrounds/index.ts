import apod from "./apod";
import colour from "./colour";
import giphy from "./giphy";
import gradient from "./gradient";
import media from "./media";
import online from "./online";
import unsplash from "./unsplash";
import wikimedia from "./wikimedia";

export const backgroundConfigs = [
  apod,
  colour,
  giphy,
  gradient,
  media,
  online,
  unsplash,
  wikimedia,
];

backgroundConfigs.sort((a, b) => {
  const nameA = typeof a.name === "string"
    ? a.name
    : (a.name.defaultMessage || a.name.id || "").toString();
  const nameB = typeof b.name === "string"
    ? b.name
    : (b.name.defaultMessage || b.name.id || "").toString();
  return nameA.localeCompare(nameB);
});
