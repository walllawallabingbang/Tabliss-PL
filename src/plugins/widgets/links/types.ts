import { API } from "../../types";

export type Link = {
  name?: string;
  icon?: string;
  url: string;
  iconSize?: number;
  IconString?: string;
  IconStringIco?: string;
  SvgString?: string;
  customWidth?: number;
  customHeight?: number;
  iconifyIdentifier?: string;
  iconifyValue?: string;
  // Reference to cached icon data
  iconCacheKey?: string;
  conserveAspectRatio?: boolean;
};

export type IconCacheItem = {
  data: string;
  type: "image" | "svg" | "ico";
  size: number;
};

export type Cache = Record<string, IconCacheItem>;

export type Data = {
  columns: number;
  links: Link[];
  visible: boolean;
  linkOpenStyle: boolean;
  linksNumbered: boolean;
  customWidth: number;
  customHeight?: number;
  iconifyIdentifier: string;
  iconifyValue?: string;
  conserveAspectRatio?: boolean;
};

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  columns: 1,
  links: [{ url: "https://tabliss.io" }],
  visible: true,
  linkOpenStyle: false,
  linksNumbered: false,
  customWidth: 24,
  customHeight: 24,
  iconifyIdentifier: "feather:",
  conserveAspectRatio: false,
};

export const defaultCache: Cache = {};
