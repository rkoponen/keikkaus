import React from "react";

interface ChosenNumbersProps {
  selectedNumbers: number[];
  length: number;
}

const ChosenNumbers = (props: ChosenNumbersProps) => {

  return (
    <div className="text-center w-full">
      <h2 className="text-lg">Valitut numerot</h2>
      <div className="p-2 border rounded-xl border-cyan-600 flex flex-col justify-center items-center">
        <div className={`flex flex-wrap justify-between w-full`}>
          {Array.from({ length: props.length }, (x, i) => i).map((x) => {
            return (
              <span
                key={x}
                className="border border-cyan-200 rounded-full w-6 h-6 sm:w-8 sm:h-8 p-1"
              >
                <div className="h-full flex  items-center justify-center">
                  {props.selectedNumbers[x] ? props.selectedNumbers[x] : ""}
                </div>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChosenNumbers;
