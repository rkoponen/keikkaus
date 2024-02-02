"use client";
import React from "react";

interface NumberGridProps {
  length: number;
  selectableLength: number;
  selectedNumbers: number[];
  handleNumberClick: (number: number) => void;
}
const NumberGrid = (props: NumberGridProps) => {

  let numbers = Array.from({ length: props.selectableLength }, (_, index) => {
    return index + 1;
  });

  let gridCols = "grid-cols-10";
  if (props.selectableLength === 24) {
    gridCols = "grid-cols-8";
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-lg">Valitse numerot</h1>
      <div className={`grid ${gridCols} w-full gap-2 rounded-lg sm:w-max`}>
        {numbers.map((x) => {
          const selected = props.selectedNumbers.includes(x);
          return (
            <div
              key={x}
              onClick={() => {
                props.handleNumberClick(x);
              }}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-cyan-600 text-sm text-slate-100 hover:border hover:border-cyan-400 sm:h-12 sm:w-12 ${
                selected ? "bg-yellow-500" : "bg-cyan-600"
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
