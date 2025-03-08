import { FC, useEffect } from "react";
import { Props, defaultData } from "./types";
import React from "react";
const Unknown: FC<Props> = ({ data = defaultData }) => (
  <p>Something has gone wrong</p>
)

export default Unknown;
