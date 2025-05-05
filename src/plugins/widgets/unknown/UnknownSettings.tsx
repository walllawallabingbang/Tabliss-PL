import React, { FC } from "react";

const UnknownSettings: FC = () => {
  return (
    <div className="UnknownSettings">
      <p className="info">
        Something went wrong, perhaps an outdated or incompatible config was imported? If you need any help whatsoever, please open an issue on <a href="https://github.com/BookCatKid/TablissNG/issues/new" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </div>
  );
};

export default UnknownSettings;
