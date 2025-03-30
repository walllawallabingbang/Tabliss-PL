import { API } from "../../types";
import { Gif } from "./types";

type Config = {
  tag: string;
  nsfw: boolean;
};

export async function getGif(
  { tag, nsfw }: Config,
  loader: API["loader"],
): Promise<Gif> {
  // TODO: Add support for multiple tags in one image, and add explanation on how tags are seperated/randomized
  const tags = tag.split(",").map((t) => t.trim());
  const randomTag = tags[Math.floor(Math.random() * tags.length)];

  if (!GIPHY_API_KEY) {
    throw new Error("You must set the GIPHY_API_KEY environment variable.");
  }

  const request = new Request(
    "https://api.giphy.com/v1/gifs/random" +
      `?api_key=${GIPHY_API_KEY}` +
      "&rating=" +
      (nsfw ? "r" : "g") +
      (randomTag ? `&tag=${encodeURIComponent(randomTag)}` : ""),
  );

  loader.push();
  const res = await (await fetch(request)).json();
  if (!res.data) {
    throw new Error("No GIF found.");
  }
  const data = await (await fetch(res.data.images.original.webp)).blob();
  loader.pop();

  return {
    data,
    link: res.data.url,
  };
}
