import React from "react";
import { defaultData, Props } from "./types";

const IpInfoSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="IpInfoSettings">
    <label>
      <input
        type="checkbox"
        checked={data.displayCity}
        onChange={() => setData({ ...data, displayCity: !data.displayCity })}
      />
      Display City
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.displayCountry}
        onChange={() =>
          setData({ ...data, displayCountry: !data.displayCountry })
        }
      />
      Display Country
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.hideIP}
        onChange={() => setData({ ...data, hideIP: !data.hideIP })}
      />
      Hide IP
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.maskIP}
        onChange={() => setData({ ...data, maskIP: !data.maskIP })}
      />
      Mask IP
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.clickToRefresh}
        onChange={() => setData({ ...data, clickToRefresh: !data.clickToRefresh })}
      />
      Enable Click to Refresh
    </label>
  </div>
);

export default IpInfoSettings;

