import { API } from "../../types";

type Data = {
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  timeZone: string | null;
  name?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  timeZone: null,
};
