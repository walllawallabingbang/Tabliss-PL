import React, { useState } from "react";
import { useObjectUrls } from "../../../hooks";
import { IconButton, RemoveIcon } from "../../../views/shared";
import "./ImageSettings.sass";
import { defaultCache, Props } from "./types";

const ImageSettings: React.FC<Props> = ({ cache = defaultCache, setCache }) => {
  const urls = useObjectUrls(cache);
  const [isExpanded, setIsExpanded] = useState(false);

  const addImages = (files: FileList) =>
    setCache(cache.concat(Array.from(files)));

  const removeImage = (index: number) =>
    setCache(cache.filter((_, i) => index !== i));

  const largeImages = cache.some((image) => image.size > 2097152);

  return (
    <div className="ImageSettings">
      <label>
        <input
          accept="image/*"
          multiple={true}
          onChange={(event) =>
            event.target.files && addImages(event.target.files)
          }
          type="file"
        />
      </label>

      <p className="info">
        {cache.length} images uploaded.{" "}
        <a className="link" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </a>
      </p>

      <div className="grid">
        {isExpanded && urls && urls.map((url, index) => (
          <div className="preview" key={index}>
            <img src={url} />
            <IconButton
              onClick={() => removeImage(index)}
              title="Remove image"
            >
              <RemoveIcon />
            </IconButton>
          </div>
        ))}
      </div>

      {largeImages && (
        <p className="info">Large images may affect performance.</p>
      )}

      <p className="info">Images do not sync between devices.</p>
    </div>
  );
};

export default ImageSettings;
