import React from "react";
import { WidgetDisplay } from "../../db/state";

interface WidgetProps extends WidgetDisplay {
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({
  children,
  colour,
  fontFamily,
  fontSize = 24,
  scale = 1,
  rotation = 0,
  textOutline,
  textOutlineSize = 1,
  textOutlineColor = "#000000",
  fontWeight,
}) => {
  const styles: React.CSSProperties = {
    position: "relative",
    color: colour,
    fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight,
    transform: `scale(${scale}) rotate(${rotation}deg)`,
  };

  if (textOutline) {
    return (
      <div 
        className={`Widget ${fontWeight ? "weight-override" : ""}`}
        style={styles}
      >
        <span style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: textOutlineColor,
          zIndex: 0,
          WebkitTextStroke: `${textOutlineSize * 2}px ${textOutlineColor}`,
        }}>
          {children}
        </span>
        <span style={{
          position: "relative",
          zIndex: 1,
        }}>
          {children}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`Widget ${fontWeight ? "weight-override" : ""}`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default Widget;

