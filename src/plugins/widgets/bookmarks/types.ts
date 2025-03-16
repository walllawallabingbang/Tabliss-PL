import { API } from "../../types";

type Data = {
  rootBookmark: string | null;
  maxWidth: number;
  maxHeight: number;
  wrap: boolean;
  navigationStyle: 'drill-down' | 'expand-collapse';
};

export type Props = API<Data>;

export const defaultData: Data = {
  rootBookmark: null,
  maxWidth: 30,
  maxHeight: 40,
  wrap: true,
  navigationStyle: 'drill-down'
};
