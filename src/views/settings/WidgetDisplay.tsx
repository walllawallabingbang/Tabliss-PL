import React from "react";
import { WidgetDisplay as WidgetDisplayType } from "../../db/state";
import PositionInput from "./PositionInput";
import "./WidgetDisplay.css";

type Props = {
  display: WidgetDisplayType;
  onChange: (display: Partial<WidgetDisplayType>) => void;
};

const WidgetDisplay: React.FC<Props> = ({ display, onChange }) => {
  return (
    <div className="WidgetDisplay">
      <PositionInput
        value={display.position}
        onChange={(position) => onChange({ position })}
      />

      <label>
        Font Size
        <br />
        <input
          type="range"
          value={display.fontSize}
          min="2"
          max="100"
          step="2"
          onChange={(event) =>
            onChange({ fontSize: Number(event.target.value) })
          }
        />
      </label>

      <label>
        Scale
        <br />
        <input
          type="range"
          value={display.scale}
          list="scale-markers"
          min="0"
          max="2"
          step="0.1"
          onChange={(event) =>
            onChange({ scale: Number(event.target.value) })
          }
        />
        <datalist id="scale-markers">
          {/* <option value="0.5" label="-0.5" /> */}
          <option value="1" label="Default" />
          {/* <option value="1.5" label="+0.5" /> */}
        </datalist>
      </label>

      <label>
        Rotation
        <br />
        <input
          type="range"
          value={display.rotation ?? 0}
          min="-180"
          max="180"
          step="0.1"
          list="rotation-markers"
          onChange={(event) =>
            onChange({ rotation: Number(event.target.value) })
          }
        />
        <datalist id="rotation-markers">
          <option value="-180" label="-180°" />
          <option value="-90" label="-90°" />
          <option value="0" label="0°" />
          <option value="90" label="90°" />
          <option value="180" label="180°" />
        </datalist>
      </label>
    </div>
  );
};

export default WidgetDisplay;
