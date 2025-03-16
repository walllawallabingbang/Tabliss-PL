import React, { FC } from "react";

import { Props, defaultData } from "./types";
import { DebounceInput } from "../../shared";

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings">
    <label>
      Tag
      <DebounceInput
        type="text"
        value={data.tag}
        onChange={(value) => setData({ ...data, tag: value })}
        wait={500}
      />
    </label>
    <p className="info">Separate multiple tags with a comma</p>

    <label>
      <input
        type="checkbox"
        checked={data.nsfw}
        onChange={() => setData({ ...data, nsfw: !data.nsfw })}
      />{" "}
      Include NSFW content
    </label>
  </div>
);

export default GiphySettings;
