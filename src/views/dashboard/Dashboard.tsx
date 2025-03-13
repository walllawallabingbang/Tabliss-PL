import React from "react";
import { db } from "../../db/state";
import { useIsNight } from "../../hooks";
import { useValue } from "../../lib/db/react";
import Background from "./Background";
import "./Dashboard.sass";
import Overlay from "./Overlay";
import Widgets from "./Widgets";

const Dashboard: React.FC = () => {
  const background = useValue(db, "background");
  const darkMode = useValue(db, "darkMode");
  const theme = darkMode ? "dark" : "";

  return (
    <div className={`Dashboard fullscreen ${theme}`}>
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

export default React.memo(Dashboard);
