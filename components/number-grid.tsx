"use client";
import React, { useState } from "react";


interface NumberGridProps {
  length: number;
  selectableLength: number;
  selectedNumbers: number[];
  handleNumberClick: (number: number) => void;
}
const NumberGrid = (props: NumberGridProps) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  let numbers = Array.from({ length: props.selectableLength }, (_, index) => {
    return index + 1;
  });

  let gridCols = "grid-cols-10";
  if (props.selectableLength === 24) {
    gridCols = "grid-cols-8";
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-lg">Valitse numerot</h1>
      <div className={`grid ${gridCols} gap-2 rounded-lg w-max`}>
        {numbers.map((x) => {
          const selected = props.selectedNumbers.includes(x);
          return (
            <div
              key={x}
              onClick={() => {
                props.handleNumberClick(x);
              }}
              className={`bg-cyan-600 hover:border hover:border-cyan-400 rounded-full flex justify-center text-sm h-10 sm:h-12 w-10 sm:w-12 items-center text-slate-100 cursor-pointer ${
                selected ? "bg-green-500" : ""
              }`}
            >
              {x}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NumberGrid;
