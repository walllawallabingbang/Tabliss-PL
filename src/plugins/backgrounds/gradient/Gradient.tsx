import React, { FC, useEffect, useState } from "react";
import { Props, defaultData } from "./types";

interface GradientData {
  name: string;
  colors: string[];
}

const Gradient: FC<Props> = ({ data = defaultData, setData }) => {
  const [randomGradient, setRandomGradient] = useState<GradientData | null>(null);

  useEffect(() => {
    if (data.isRandom) {
      fetch('https://raw.githubusercontent.com/ghosh/uiGradients/refs/heads/master/gradients.json')
        .then(response => response.json())
        .then((gradients: GradientData[]) => {
          const randomIndex = Math.floor(Math.random() * gradients.length);
          const selectedGradient = gradients[randomIndex];
          setRandomGradient(selectedGradient);
          setData({ ...data, currentGradientName: selectedGradient.name });
        })
        .catch(error => {
          console.error('Failed to fetch random gradient:', error);
          setRandomGradient(null);
          setData({ ...data, currentGradientName: undefined });
        });
    }
  }, [data.isRandom]);

  const backgroundImage = data.isRandom && randomGradient
    ? `linear-gradient(${data.angle}deg, ${randomGradient.colors.join(', ')})`
    : `${data.type}(${data.angle}deg, ${data.from}, ${data.to})`;

  return (
    <div
      className="Gradient fullscreen"
      style={{ backgroundImage }}
    />
  );
};

export default Gradient;
