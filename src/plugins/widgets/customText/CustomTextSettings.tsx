import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { Props, defaultData } from "./types";

const CustomTextSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const handleTimeoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setData({ ...data, timeout: value === -1 ? data.timeout : value });
  };

  return (
    <div className="CustomTextSettings">
      <label>
        <span style={{ float: "right" }}>
          {data.paused ? <span className="text--grey">(Paused) </span> : null}
          <a onClick={() => setData({ ...data, paused: !data.paused })}>
            <Icon icon={`feather:${data.paused ? "play" : "pause"}`} />
          </a>
        </span>
        Show a new text
        <select
          value={data.timeout === 0 || data.timeout === 300 || data.timeout === 900 || data.timeout === 3600 || data.timeout === 86400 || data.timeout === 604800 ? data.timeout : -1}
          onChange={handleTimeoutChange}
        >
          <option value="0">Every new tab</option>
          <option value="300">Every 5 minutes</option>
          <option value="900">Every 15 minutes</option>
          <option value="3600">Every hour</option>
          <option value="86400">Every day</option>
          <option value="604800">Every week</option>
          {/* TODO: Add the custom interval for the unplash background too */}
          <option value="-1">Custom Interval</option>
        </select>
      </label>

      {data.timeout !== 0 && data.timeout !== 300 && data.timeout !== 900 && data.timeout !== 3600 && data.timeout !== 86400 && data.timeout !== 604800 && (
        <label>
          Custom Interval (seconds)
          <input
            type="number"
            min="0"
            value={data.timeout}
            onChange={(event) => setData({ ...data, timeout: Number(event.target.value) })}
          />
        </label>
      )}

      <label>
        Text
        <textarea
          style={{ resize: "none", overflow: "scroll" }}
          value={data.text}
          rows={10}
          onChange={(event) => setData({ ...data, text: event.target.value })}
        />
      </label>

      <label>
        Separator
        <input
          type="text"
          value={data.separator}
          disabled={data.atNewline}
          onChange={(event) => setData({ ...data, separator: event.target.value })}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.atNewline}
          onChange={(event) => {
            setData({ ...data, separator: "", atNewline: event.target.checked });
          }}
        />{" "}
        Separate at newline
      </label>
    </div>
  );
};

export default CustomTextSettings;
