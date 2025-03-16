import { API } from "../../types";

export type Gif = {
  data: Blob;
  link: string;
};

export type Data = {
  nsfw: boolean;
  tag: string;
};

export type Cache = Gif;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  nsfw: false,
  tag: "pattern",
};
