import { API } from "../../types";

type Data = {
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  timeZone: string | null;
  name?: string;
  onColor: string;
  offColor: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  timeZone: null,
  onColor: "#48d8b8",
  offColor: "#525252",
};
