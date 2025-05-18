import React from "react";
import { API } from "../../types";
import { Data, defaultData } from "./data";
import { Icon, IconButton } from "../../../views/shared";
import { FormattedMessage } from "react-intl";
import "./Notes.sass";

const alignments = [
  {
    value: "left",
    icon: "align-left",
  },
  {
    value: "center",
    icon: "align-center",
  },
  {
    value: "right",
    icon: "align-right",
  },
] as const;

const NotesSettings: React.FC<API<Data>> = ({ data = defaultData, setData }) => {
  return (
    <div className="NotesSettings">
      <label>
        <input
          type="checkbox"
          checked={data.markdownEnabled}
          onChange={(e) => setData({ ...data, markdownEnabled: e.target.checked })}
        />{" "}
        <FormattedMessage
          id="plugins.notes.enableMarkdown"
          defaultMessage="Enable Markdown formatting"
        />
      </label>

      <div>
        <label><FormattedMessage
          id="plugins.notes.textAlignment"
          defaultMessage="Text Alignment"
        /></label>
        <div className="alignment">
          {alignments.map((alignment) => (
            <IconButton
              key={alignment.value}
              onClick={() => setData({ ...data, textAlign: alignment.value })}
              primary={data.textAlign === alignment.value}
            >
              <Icon name={alignment.icon} />
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesSettings;
