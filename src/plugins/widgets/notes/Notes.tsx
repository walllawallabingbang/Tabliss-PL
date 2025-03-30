import React from "react";
import { API } from "../../types";
import { Data, defaultData } from "./data";
import Input from "./Input";
import ReactMarkdown from 'react-markdown';
import { Icon } from "@iconify/react";
import "./Notes.sass";

export const Notes: React.FC<API<Data>> = ({ data = defaultData, setData }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="Notes" style={{ textAlign: data.textAlign || "left" }}>
      <div>
        {isEditing ? (
          <Input
            value={data.notes[0].contents}
            onChange={(contents) => {
              setData({ ...data, notes: [{ contents }] });
            }}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <div 
            onClick={() => setIsEditing(true)}
            style={{ cursor: 'pointer' }}
            className={data.markdownEnabled ? "markdown-content" : ""}
          >
            {data.notes[0].contents ? (
              data.markdownEnabled ? (
                <ReactMarkdown>{data.notes[0].contents}</ReactMarkdown>
              ) : (
                data.notes[0].contents
              )
            ) : (
              <div className="placeholder">
                <Icon icon="feather:edit-3" /> Click to add note
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
