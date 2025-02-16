import React, { FC, useEffect, useState } from "react";
import { useTime } from "../../../hooks";
import { Props, defaultData } from "./types";
import "./BinaryTime.sass";
import { toZonedTime } from "date-fns-tz";

interface PipProps {
  isOn: boolean;
}

interface BinaryDigitProps {
  base2NumberAsArray: number[];
}

interface BinaryDigitGroupProps {
  group: number[][];
}

const Pip: FC<PipProps> = ({ isOn }) => (
  <div className={`pip ${isOn ? 'pip--on' : ''}`}></div>
);

const BinaryDigit: FC<BinaryDigitProps> = ({ base2NumberAsArray }) => (
  <div className="binary-digit">
    {base2NumberAsArray.map((pip, idx) => (
      <Pip key={idx} isOn={pip === 1} />
    ))}
  </div>
);

const BinaryDigitGroup: FC<BinaryDigitGroupProps> = ({ group }) => (
  <div className="binary-digit-group">
    {group.map((binaryDigit, idx) => (
      <BinaryDigit key={idx} base2NumberAsArray={binaryDigit} />
    ))}
  </div>
);

function numberToBinary(base10Number: number): number[] {
  const base2Values = [8, 4, 2, 1];
  let output = [0, 0, 0, 0];
  let remainder = base10Number;
  
  base2Values.forEach((val, idx) => {
    const left = remainder - val;
    if (left >= 0) {
      output[idx] = 1;
      remainder = left;
    }
  });
  
  return output;
}

function numberAsBinaryArrayPair(number: number): number[][] {
  const pair: number[][] = [];
  if (number < 10) {
    pair[0] = numberToBinary(0);
    pair[1] = numberToBinary(number);
  } else {
    const numberAsArray = String(number).split('');
    pair[0] = numberToBinary(parseInt(numberAsArray[0], 10));
    pair[1] = numberToBinary(parseInt(numberAsArray[1], 10));
  }
  
  return pair;
}

const BinaryTime: FC<Props> = ({ data = defaultData }) => {
  const { timeZone, name, showHours, showMinutes, showSeconds } = data;
  const [digits, setDigits] = useState<number[][][]>([[], [], []]);
  
  let time = useTime(timeZone ? "absolute" : "zoned");
  if (timeZone) {
    time = toZonedTime(time, timeZone);
  }

  useEffect(() => {
    const updateTime = () => {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      const newDigits = [
        ...(showHours ? [numberAsBinaryArrayPair(hours)] : []),
        ...(showMinutes ? [numberAsBinaryArrayPair(minutes)] : []),
        ...(showSeconds ? [numberAsBinaryArrayPair(seconds)] : [])
      ];
      
      setDigits(newDigits);
    };

    updateTime();
  }, [time, showHours, showMinutes, showSeconds]);

  return (
    <div className="BinaryTime">
      <div className="binary-clock">
        {digits.map((digit, idx) => (
          <BinaryDigitGroup key={idx} group={digit} />
        ))}
      </div>
      {name && <h2>{name}</h2>}
    </div>
  );
};

export default BinaryTime;

