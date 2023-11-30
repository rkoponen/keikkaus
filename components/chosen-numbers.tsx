import React from "react";

interface ChosenNumbersProps {
  selectedNumbers: number[]
  length: number
}

const ChosenNumbers = (props: ChosenNumbersProps) => {
  return (
    <div className="p-2 border rounded-xl border-cyan-600">
      <div className="text-center flex flex-row justify-between">
        {Array.from({ length: props.length }, (x, i) => i).map((x) => {
          return (
            <span
              key={x}
              className="border border-cyan-200 rounded-full w-10 h-10 p-1 text-lg m-1"
            >
              <div className="h-full flex  items-center justify-center">
                {props.selectedNumbers[x] ? props.selectedNumbers[x] : ""}
              </div>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ChosenNumbers;
