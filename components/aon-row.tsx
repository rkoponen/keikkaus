import { AonNumbers } from "@/types/aon-types";
import React from "react";

interface AonRowProps {
  row: AonNumbers;
}

const AonRow = ({ row }: AonRowProps) => {
  return (
    <div className="space-between grid w-full grid-cols-6 grid-rows-2 gap-2 sm:mr-2 sm:w-10/12 sm:grid-cols-12 sm:grid-rows-1">
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
  );
};

export default AonRow;
