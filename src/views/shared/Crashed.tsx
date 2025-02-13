import React, { FC } from "react";
import { FallbackProps } from "react-error-boundary";

import { Icon } from "@iconify/react";

const Crashed: FC<FallbackProps> = () => (
  <div className="Crashed">
    <Icon icon="feather:alert-triangle" /> Sorry this plugin has crashed!
  </div>
);

export default Crashed;
