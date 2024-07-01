"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import "./index.css";

interface RangeBarProps {
  tempBoolean?: boolean;
  temperature?: any;
  setTemp?: (value: number) => void;
}

const RangeBar: FC<RangeBarProps> = ({ temperature, setTemp, tempBoolean }) => {
  const [temp, setTempState] = useState(temperature);
  useEffect(() => {
    if (tempBoolean) {
      setTempState(temperature);
    }
  }, [tempBoolean, temperature]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setTempState(newValue);
    if (setTemp) {
      setTemp(newValue);
    }
  };
  return (
    <div>
      <p className="text-sm font-medium text-gray-900">{temperature}</p>
      <input
        type="range"
        className="range-input"
        value={temperature}
        onChange={handleChange}
      />
    </div>
  );
};

export default RangeBar;
