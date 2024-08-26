"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import "./index.css";

interface RangeBarProps {
  tempBoolean?: boolean;
  temperature?: number;
  setTemp?: (value: number) => void;
  readOnly?: boolean; // New prop to control read-only behavior
}

const RangeBar: FC<RangeBarProps> = ({
  temperature = 0,
  setTemp,
  tempBoolean,
  readOnly = false, // Default value is false
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
      <p className="text-sm font-medium text-gray-900">{temp.toFixed(1)}</p>
      <input
        type="range"
        className="range-input"
        min="0"
        max="1"
        step="0.1"
        value={temp}
        onChange={handleChange}
        disabled={readOnly} // Disable the range input when readOnly is true
      />
    </div>
  );
};

export default RangeBar;
