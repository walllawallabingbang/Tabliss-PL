import { API } from "../../types";

export type Data = {
  rootBookmark: string | null;
  maxWidth: number;
  maxHeight: number;
  wrap: boolean;
  navigationStyle: "drill-down" | "expand-collapse" | "auto-expanded";
  iconProvider:
    | "_default"
    | "_favicon_duckduckgo"
    | "_favicon_google"
    | "_favicon_favicone";
  shortNames: boolean;
  maxTextLength: number;
};

export type Props = API<Data>;

export const defaultData: Data = {
  rootBookmark: null,
  maxWidth: 30,
  maxHeight: 40,
  wrap: true,
  navigationStyle: "drill-down",
  iconProvider: "_default",
  shortNames: false,
  maxTextLength: 0,
};
