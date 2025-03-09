import React, { FC } from "react";

import { Props, defaultData } from "./types";
import TimeZoneInput from "../../../views/shared/timeZone/TimeZoneInput";

const TimeSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="TimeSettings">
    <label>
      Name
      <input
        type="text"
        value={data.name}
        placeholder="Optional name"
        onChange={(event) => setData({ ...data, name: event.target.value })}
      />
    </label>

    <label>
      Time Zone
      <TimeZoneInput
        timeZone={data.timeZone}
        onChange={(timeZone) => setData({ ...data, timeZone })}
      />
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showSeconds}
        onChange={() => setData({ ...data, showSeconds: !data.showSeconds })}
      />{" "}
      Display seconds
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showMinutes}
        onChange={() => setData({ ...data, showMinutes: !data.showMinutes })}
      />{" "}
      Display minutes
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showHours}
        onChange={() => setData({ ...data, showHours: !data.showHours })}
      />{" "}
      Display hours
    </label>

    <label>
      Active Color
      <input
        type="color"
        value={data.onColor}
        onChange={(event) => setData({ ...data, onColor: event.target.value })}
      />
    </label>

    <label>
      Inactive Color
      <input
        type="color"
        value={data.offColor}
        onChange={(event) => setData({ ...data, offColor: event.target.value })}
      />
    </label>
  </div>
);

export default TimeSettings;

