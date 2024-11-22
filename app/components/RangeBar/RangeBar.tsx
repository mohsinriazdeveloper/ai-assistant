"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import "./index.css";

interface RangeBarProps {
  tempBoolean?: boolean;
  temperature?: number;
  setTemp?: (value: number) => void;
  readOnly?: boolean;
  checkOption?: string;
}

const RangeBar: FC<RangeBarProps> = ({
  temperature = 0,
  setTemp,
  tempBoolean,
  readOnly = false,
  checkOption,
}) => {
  const [temp, setTempState] = useState<number>(temperature);

  useEffect(() => {
    if (tempBoolean) {
      setTempState(temperature);
    }
  }, [tempBoolean, temperature]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setTempState(newValue);
    if (setTemp && !readOnly) {
      setTemp(newValue);
    }
  };

  return (
    <div>
      {checkOption !== "chatagent" && (
        <p className="text-sm font-medium text-gray-900">{temp.toFixed(1)}</p>
      )}
      <input
        type="range"
        className={`range-input ${
          checkOption === "chatagent" ? "h-[2px]" : "h-[6px]"
        } `}
        min="0"
        max="1"
        step="0.1"
        value={temp}
        onChange={handleChange}
        disabled={readOnly}
      />
    </div>
  );
};

export default RangeBar;
