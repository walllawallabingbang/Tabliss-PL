import React from "react";

import Backdrop from "../../../views/shared/Backdrop";

import { defaultData, Props } from "./types";
import { getPicture } from "./api";
import ApodTitle from "./ApodTitle";
import "./Apod.sass";

const Apod: React.FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
}) => {
  const [picture, setPicture] = React.useState(cache);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    getPicture(data, loader).then(setCache);
    if (mounted.current || !picture) getPicture(data, loader).then(setPicture);
    mounted.current = true;
  }, [data.customDate, data.date]);

  const imageUrl = picture?.media_type === "image"
    ? picture?.hdurl || picture?.url
    : picture?.thumbnail_url;

  return (
    <div className="Apod fullscreen">
      <Backdrop
        className="picture fullscreen"
        ready={!!imageUrl}
        url={imageUrl}
      >
        {picture && data.showTitle && (
          <ApodTitle title={picture.title} copyright={picture.copyright} />
        )}
      </Backdrop>
    </div>
  );
};

export default Apod;
