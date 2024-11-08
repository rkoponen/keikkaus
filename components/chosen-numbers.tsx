import React from "react";
import { FaStar } from "react-icons/fa";

interface ChosenNumbersProps {
  selectedNumbers: number[];
  starNumbers?: number[];
  length: number;
}

const ChosenNumbers = (props: ChosenNumbersProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <h2 className="text-lg">Valitut numerot</h2>
      <div className="flex flex-row items-center justify-center gap-4 rounded-xl border border-cyan-600 p-2">
        <div className={`flex justify-between gap-1 sm:gap-2`}>
          {Array.from({ length: props.length }, (x, i) => i).map((x) => {
            return (
              <span
                key={x}
                className="h-6 w-6 rounded-full border border-cyan-200 p-1 sm:h-10 sm:w-10"
              >
                <div className="flex h-full  items-center justify-center">
                  {props.selectedNumbers[x] ? props.selectedNumbers[x] : ""}
                </div>
              </span>
            );
          })}
        </div>
        {props.starNumbers && <FaStar />}
        {props.starNumbers && (
          <div className="flex flex-row gap-2">
            {Array.from({ length: 2 }, (x, i) => i).map((x) => {
              return (
                <span
                  key={x}
                  className="h-6 w-6 rounded-full border border-cyan-200 p-1 sm:h-10 sm:w-10"
                >
                  <div className="flex h-full  items-center justify-center">
                    {props.starNumbers![x] ? props.starNumbers![x] : ""}
                  </div>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChosenNumbers;
