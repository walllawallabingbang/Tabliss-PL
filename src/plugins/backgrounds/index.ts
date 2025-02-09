import colour from "./colour";
import gradient from "./gradient";
import image from "./image";
import online from "./online";
import unsplash from "./unsplash";
import giphy from "./giphy";
import apod from "./apod";

export const backgroundConfigs = [colour, giphy, gradient, image, online, unsplash, apod];

backgroundConfigs.sort((a, b) => a.name.localeCompare(b.name));
