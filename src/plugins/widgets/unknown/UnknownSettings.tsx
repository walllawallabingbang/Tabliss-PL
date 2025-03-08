import React, { FC } from "react";
import { Props, defaultData } from "./types";

const UnknownSettings: FC<Props> = ({ data = defaultData, setData }) => {
  return (
    <div className="UnknownSettings">
      <p className="info">
        Something has gone wrong, perhaps an outdated or incompatible config was imported? If you need any help whatsoever, please open an issue on <a href="https://github.com/BookCatKid/tabliss-maintained/issues/new" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </div>
  );
};

export default UnknownSettings;

