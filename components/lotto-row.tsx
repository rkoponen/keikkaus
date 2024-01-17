import { LottoNumbers } from "@/types/lotto-types";
import React from "react";

interface LottoRowProps {
  row: LottoNumbers;
}

const LottoRow = ({ row }: LottoRowProps) => {
  return (
    <div className="flex w-full flex-row gap-6">
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

export default LottoRow;
