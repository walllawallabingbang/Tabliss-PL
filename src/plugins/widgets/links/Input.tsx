import icons from "feather-icons/dist/icons.json";
import React, { FC } from "react";

import {
  IconButton,
  RemoveIcon,
  DownIcon,
  UpIcon,
} from "../../../views/shared";
import { Link } from "./types";

type Props = Link & {
  number: number;
  onChange: (values: Partial<Link>) => void;
  setIconSize: (iconSize: number) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
};

const iconList = Object.keys(icons);

const Input: FC<Props> = (props) => {
  const isGoogleOrFavicone = props.icon === "_favicon_google" || props.icon === "_favicon_favicone";

  return (
    <div className="LinkInput">
      <h5>
        <div className="title--buttons">
          <IconButton onClick={props.onRemove} title="Remove link">
            <RemoveIcon />
          </IconButton>
          {props.onMoveDown && (
            <IconButton onClick={props.onMoveDown} title="Move link down">
              <DownIcon />
            </IconButton>
          )}
          {props.onMoveUp && (
            <IconButton onClick={props.onMoveUp} title="Move link up">
              <UpIcon />
            </IconButton>
          )}
        </div>

        {props.number <= 9 ? `Keyboard shortcut ${props.number}` : "Shortcut"}
      </h5>

      <label>
        URL
        <input
          type="url"
          value={props.url}
          onChange={(event) => props.onChange({ url: event.target.value })}
        />
      </label>

      <label>
        Name <span className="text--grey">(optional)</span>
        <input
          type="text"
          value={props.name}
          onChange={(event) => props.onChange({ name: event.target.value })}
        />
      </label>

      <label>
        Icon <span className="text--grey">(optional)</span>
        <select
          value={props.icon}
          onChange={(event) => props.onChange({ icon: event.target.value })}
        >
          <option value={""}>None</option>
          <optgroup label="Website Icons">
            <option value="_favicon_google">From Google</option>
            <option value="_favicon_duckduckgo">From DuckDuckGo</option>
            <option value="_favicon_favicone">From Favicone</option>
          </optgroup>
          <optgroup label="Feather Icons">
            {iconList.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </optgroup>
        </select>
      </label>

      {isGoogleOrFavicone && (
        <label>
          Icon Size
          <select
            // value={props.iconSize}
            onChange={(event) => props.setIconSize(Number(event.target.value))}
          >
            <option value="16">16x16</option>
            <option value="32">32x32</option>
            <option value="64">64x64</option>
            <option value="128">128x128</option>
            <option value="256">256x256</option>
          </select>
        </label>
      )}

      <hr />
    </div>
  );
};

export default Input;


