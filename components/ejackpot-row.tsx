import { AonNumbers, EjpNumbers } from "@/types/lotto-types";
import React from "react";
import { FaStar } from "react-icons/fa";
interface EjackpotRowProps {
  row: EjpNumbers;
}

const EjackpotRow = ({ row }: EjackpotRowProps) => {
  return (
    <div className="flex w-max flex-row items-center gap-6">
      <div className="flex flex-row gap-2">
        {row.numbers.map((number, innerIndex) => (
          <div
            key={innerIndex}
            className="flex h-8 w-8 items-center justify-center rounded-full border p-1 text-sm sm:h-10 sm:w-10"
            data-testid="selected-number"
          >
            {number}
          </div>
        ))}
      </div>
      <FaStar />
      <div className="flex flex-row gap-2">
        {row.starNumbers.map((number, innerIndex) => (
          <div
            key={innerIndex}
            className="flex h-8 w-8 items-center justify-center rounded-full border p-1 text-sm sm:h-10 sm:w-10"
            data-testid="selected-number"
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EjackpotRow;
