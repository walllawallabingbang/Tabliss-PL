import React, { FC } from "react";

import { Props, defaultData } from "./types";

const GradientSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GradientSettings">
    <label>
      <input
        type="checkbox"
        checked={data.isRandom}
        onChange={(event) => setData({ ...data, isRandom: event.target.checked })}
      />{" "}
      Use Random Gradients
    </label>

    {data.isRandom && data.currentGradientName && (
      <p style={{ 
        margin: "0.5rem 0",
        padding: "0.5rem",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: "4px"
      }}>
        Current Gradient: {data.currentGradientName}
      </p>
    )}

    <label>
      Type
      <select
        value={data.type}
        onChange={(event) =>
          setData({
            ...data,
            type: event.target.value as "linear-gradient" | "radial-gradient",
          })
        }
      >
        <option value="linear-gradient">Linear</option>
        <option value="radial-gradient">Radial</option>
      </select>
    </label>

    {data.type === "linear-gradient" && (
      <label>
        Angle (0-360)
        <input
          type="number"
          value={data.angle}
          onChange={(event) =>
            setData({ ...data, angle: Number(event.target.value) })
          }
          min={0}
          max={360}
        />
      </label>
    )}

    {!data.isRandom && (
      <>
        <label>
          From Colour
          <input
            type="color"
            value={data.from}
            onChange={(event) => setData({ ...data, from: event.target.value })}
          />
        </label>

        <label>
          To Colour
          <input
            type="color"
            value={data.to}
            onChange={(event) => setData({ ...data, to: event.target.value })}
          />
        </label>
      </>
    )}
  </div>
);

export default GradientSettings;
