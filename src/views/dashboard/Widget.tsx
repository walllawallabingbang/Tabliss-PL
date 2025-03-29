import React from "react";
import { WidgetDisplay, WidgetPosition } from "../../db/state";
import { setWidgetDisplay } from "../../db/action";
import FloatingSaveButton from '../shared/FloatingSaveButton';

interface WidgetProps extends WidgetDisplay {
  id: string;
  children: React.ReactNode;
  position: WidgetPosition;
  x?: number;
  y?: number;
  isEditingPosition?: boolean;
}

const Widget: React.FC<WidgetProps> = ({
  id,
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
  position,
  x = window.innerWidth / 2,
  y = window.innerHeight / 2,
  isEditingPosition = false,
}) => {
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [offset, setOffset] = React.useState({ x, y });
  const [width, setWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (position === "free" && widgetRef.current && !width) {
      setWidth(widgetRef.current.offsetWidth);
    }
  }, [position]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!widgetRef.current || !isEditingPosition || position !== "free") return;
    
    e.preventDefault();
    const rect = widgetRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDrag = React.useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setOffset({ x: newX, y: newY });
    setWidgetDisplay(id, { position: "free", x: newX, y: newY });
  }, [isDragging, dragStart, id]);

  React.useEffect(() => {
    if (!isDragging) return;
    
    document.addEventListener('mousemove', handleDrag);
    const stopDragging = () => setIsDragging(false);
    document.addEventListener('mouseup', stopDragging);
    
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, handleDrag]);

  const styles: React.CSSProperties = {
    position: position === "free" ? "absolute" : "relative",
    color: colour,
    fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight,
    transform: `scale(${scale}) rotate(${rotation}deg)`,
    ...(position === "free" && {
      left: `${offset.x}px`,
      top: `${offset.y}px`,
      width: width ? `${width}px` : 'auto',
      whiteSpace: 'nowrap',
      ...(isEditingPosition && {
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      })
    })
  };

  const handleSave = () => {
    setIsDragging(false);
    setWidgetDisplay(id, {
      position: "free",
      x: offset.x,
      y: offset.y,
      isEditingPosition: false
    });
  };

  const renderContent = () => (
    <div
      ref={widgetRef}
      className={`Widget ${fontWeight ? "weight-override" : ""}`}
      style={styles}
      onMouseDown={handleDragStart}
    >
      {textOutline ? (
        <>
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
          <span style={{ position: "relative", zIndex: 1 }}>
            {children}
          </span>
        </>
      ) : children}
    </div>
  );

  return (
    <>
      {renderContent()}
      {isEditingPosition && <FloatingSaveButton onClick={handleSave} />}
    </>
  );
};

export default Widget;

