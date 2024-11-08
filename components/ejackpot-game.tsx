//TODO ejakcpot options
"use client";
import { useState } from "react";
import NumberGrid from "./number-grid";
import { sortNumbers } from "@/app/utils/number-utils";
import { EjpNumbers } from "@/types/lotto-types";
import ChosenRows from "./chosen-rows";
import ChosenNumbers from "./chosen-numbers";

export const EjackpotGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [starNumbers, setStarnumbers] = useState<number[]>([]);
  const [rows, setRows] = useState<EjpNumbers[]>([]);

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      const newNumbers = selectedNumbers.filter((x) => x !== number);
      setSelectedNumbers(newNumbers);
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers(sortNumbers(selectedNumbers, number));
    }
  };

  const handleStarNumberClick = (number: number) => {
    if (starNumbers.includes(number)) {
      const newNumbers = starNumbers.filter((x) => x !== number);
      setStarnumbers(newNumbers);
    } else if (starNumbers.length < 2) {
      if (starNumbers.length === 1) {
        const newEjackpotNumbers: EjpNumbers = {
          numbers: selectedNumbers,
          starNumbers: sortNumbers(starNumbers, number),
        };
        setRows([...rows, newEjackpotNumbers]);
        setSelectedNumbers([]);
        setStarnumbers([]);
      } else {
        setStarnumbers(sortNumbers(starNumbers, number));
      }
    }
  };

  const handleClickDelete = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  let numbers = Array.from({ length: 10 }, (_, index) => {
    return index + 1;
  });

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl">Eurojackpot</h1>
        <NumberGrid
          length={5}
          selectableLength={50}
          handleNumberClick={handleNumberClick}
          selectedNumbers={selectedNumbers}
        />
        <div className="text-center">
          <span>Valitse tähtinumerot</span>
          <div className="flex flex-row gap-2">
            {numbers.map((x) => {
              const selected = starNumbers.includes(x);

              return (
                <div
                  key={x}
                  onClick={() => {
                    handleStarNumberClick(x);
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
        <ChosenNumbers
          selectedNumbers={selectedNumbers}
          starNumbers={starNumbers}
          length={5}
        />
        <div className="w-max">
          <ChosenRows rows={rows} handleClickDelete={handleClickDelete} />
        </div>
      </div>
    </div>
  );
};
