import { API } from "../../types";

export type Link = {
  name?: string;
  icon?: string;
  url: string;
  iconSize?: number;
  IconString?: string;
  IconStringIco?: string;
  SvgString?: string;
  customIconSize?: number;
};

export type Data = {
  columns: number;
  links: Link[];
  visible: boolean;
  linkOpenStyle: boolean;
  linksNumbered: boolean;
  customIconSize: number;
};

export type Props = API<Data>;

export const defaultData = {
  columns: 1,
  links: [{ url: "https://tabliss.io" }],
  visible: true,
  linkOpenStyle: false,
  linksNumbered: false,
  customIconSize: 24,
};
