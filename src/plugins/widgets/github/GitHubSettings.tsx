import React from "react";
import { DebounceInput } from "../../shared";
import { defaultData, Props } from "./types";

const GitHubSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <label>
      GitHub Username
      <DebounceInput
        type="text"
        value={data.username || ""}
        onChange={(username) => setData({ ...data, username })}
      />
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showColorLegend}
        onChange={(event) =>
          setData({ ...data, showColorLegend: !data.showColorLegend })
        }
      />{" "}
      Show color legend
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showMonthLabels}
        onChange={(event) =>
          setData({ ...data, showMonthLabels: !data.showMonthLabels })
        }
      />{" "}
      Show month labels
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.showTotalCount}
        onChange={(event) =>
          setData({ ...data, showTotalCount: !data.showTotalCount })
        }
      />{" "}
      Show total count
    </label>
  </div>
);

export default GitHubSettings;
