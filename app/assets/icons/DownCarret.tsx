import { FC } from "react";

interface DownCarretProps {
  width?: string;
  height?: string;
  color?: string;
}
const DownCarret: FC<DownCarretProps> = ({ width, height, color }) => {
  return (
    <svg
      width={width ? width : "15"}
      // height={height ? height : "18"}
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L18.0667 17L33 1"
        stroke={color ? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownCarret;
