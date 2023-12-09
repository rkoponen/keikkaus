"use client";
import NumberGrid from "@/components/number-grid";
import ChosenNumbers from "@/components/chosen-numbers";
import { useState } from "react";
import { sortNumbers } from "../utils/number-utils";
import ChosenRows from "@/components/chosen-rows";

const AoNPage = () => {
  const [rows, setRows] = useState<number[][]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const length = 12;

  const handleNumberClick = (number: number) => {
    console.log("hello");
    if (selectedNumbers.includes(number)) {
      const newNumbers = selectedNumbers.filter((x) => x !== number);
      setSelectedNumbers(newNumbers);
    } else if (selectedNumbers.length < length) {
      if (selectedNumbers.length === length - 1) {
        const newNumbers = sortNumbers(selectedNumbers, number);
        setRows([...rows, newNumbers]);
        setSelectedNumbers([]);
      } else {
        setSelectedNumbers(sortNumbers(selectedNumbers, number));
      }
    }
  };

  const handleClickDelete = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="z-10 flex flex-col gap-6 w-full lg:w-7/12 items-center justify-center font-mono text-sm">
        <NumberGrid
          length={length}
          selectableLength={24}
          handleNumberClick={handleNumberClick}
          selectedNumbers={selectedNumbers}
        />
        <ChosenNumbers selectedNumbers={selectedNumbers} length={length} />
        <ChosenRows rows={rows} handleClickDelete={handleClickDelete} />
      </div>
    </main>
  );
};

export default AoNPage;
