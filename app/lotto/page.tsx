"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import React, { useRef, useState } from "react";
import { BsTrash3Fill, BsPCircle } from "react-icons/bs";
import { selectPlusNumber } from "../utils/lotto-utils";
import ResultList from "@/components/result-list";
import { ButtonTooltip } from "@/components/button-tooltip";
import ChosenNumbers from "@/components/chosen-numbers";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { sortNumbers } from "../utils/number-utils";

let lottoNumbers = Array.from({ length: 40 }, (_, index) => {
  return index + 1;
});

export type PlayerNumbers = {
  numbers: number[];
  plusNumber?: number;
};

const LottoPage = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [rows, setRows] = useState<PlayerNumbers[]>([]);
  const [years, setYears] = useState<number>(25);
  const [startSimulation, setStartSimulation] = useState<boolean>(false);
  const [resultListKey, setResultListKey] = useState<number>(0);
  const [simulationDone, setSimulationDone] = useState<boolean>(false);
  const [plusNumber, setPlusNumber] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const numbersDivRef = useRef<HTMLDivElement>(null);

  const handleClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      const newNumbers = selectedNumbers.filter((x) => x !== number);
      setSelectedNumbers(newNumbers);
    } else if (selectedNumbers.length < 7) {
      if (selectedNumbers.length === 6) {
        const newNumbers: PlayerNumbers = {
          numbers: sortNumbers(selectedNumbers, number),
          plusNumber: plusNumber ? selectPlusNumber() : undefined,
        };
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

  const handleSliderChange = (value: number[]) => {
    setYears(value[0]);
    setStartSimulation(false);
  };

  const handleSwitchChange = () => {
    let plus = !plusNumber;
    setPlusNumber(plus);
    if (plus) {
      let newRows = rows;
      newRows.forEach((row) => {
        row.plusNumber = selectPlusNumber();
      });
      setRows(newRows);
    } else {
      let newRows = rows;
      newRows.forEach((row) => {
        row.plusNumber = undefined;
      });
      setRows(newRows);
    }
  };

  const handleClickSimulation = () => {
    setSimulationDone(false);
    const started = !startSimulation;
    setStartSimulation(started);
    setResultListKey((prev) => prev + 1);

    if (!started) {
      if (numbersDivRef.current) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } else {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    }
  };

  const handleSimulationDone = () => {
    setSimulationDone(true);
    setStartSimulation(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 sm:p-24">
      <div className="z-10 flex flex-col gap-6 w-full lg:w-7/12 items-center justify-center font-mono text-sm">
        <h1 className="text-xl">Lotto</h1>
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-lg">Valitse numerot</h1>
          <div
            ref={numbersDivRef}
            className="grid grid-cols-8 gap-2 grid-rows-5 sm:grid-cols-10 sm:grid-rows-4 rounded-lg w-full"
          >
            {lottoNumbers.map((x) => {
              const selected = selectedNumbers.includes(x);
              return (
                <div
                  key={x}
                  onClick={() => handleClick(x)}
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
        <div className="w-full">
          <h2 className="text-lg text-center">Valitut numerot</h2>
          <ChosenNumbers selectedNumbers={selectedNumbers} length={7} />
        </div>
        <div className="w-full text-center">
          <h2 className="text-lg text-center">Valitut rivit</h2>
          {rows.length > 0 ? (
            <div className="w-full">
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-1 mt-2 p-2 border rounded-xl justify-between items-center text-center w-full"
                >
                  {row.numbers.map((number, innerIndex) => (
                    <div
                      key={innerIndex}
                      className="flex items-center justify-center border rounded-full p-1 w-8 h-8 sm:w-10 sm:h-10 text-sm"
                      data-testid="selected-number"
                    >
                      {number}
                    </div>
                  ))}
                  {row.plusNumber && (
                    <div className="flex flex-row items-center justify-between gap-2">
                      <div>
                        <BsPCircle className="w-6 h-6 text-purple-500 rounded-full" />
                      </div>
                      <div className="flex items-center justify-center border-purple-500 border rounded-full p-1 w-8 sm:w-10 h-8 sm:h-10">
                        {row.plusNumber}
                      </div>
                    </div>
                  )}
                  <button
                    className="bg-red-500 text-white w-8 sm:w-10 h-8 sm:h-10 rounded-full flex justify-center items-center"
                    onClick={() => handleClickDelete(index)}
                    data-testid="delete"
                  >
                    <BsTrash3Fill className="h-4 w-4 text-slate-100" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Valitse vähintään yksi rivi.</p>
          )}
        </div>
        {rows.length > 0 && (
          <div className="flex items-center space-x-2">
            <Label htmlFor="plus-number">Plus-numero? 0.50€/rivi.</Label>
            <Switch id="plus-number" onCheckedChange={handleSwitchChange} />
          </div>
        )}

        <div className="text-center w-full">
          <label className="" htmlFor="slider">
            Kuinka monta vuotta haluat simuloida?
          </label>
          <Slider
            className="mt-2"
            id="slider"
            defaultValue={[25]}
            min={1}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
          />
          <span className="text-lg font-medium">{years} vuotta</span>
        </div>
        <div className="w-full h-screen" ref={scrollContainerRef}>
          <ButtonTooltip
            button={
              <Button
                className="w-full mt-4"
                onClick={handleClickSimulation}
                disabled={rows.length === 0}
              >
                {startSimulation === true
                  ? `Lopeta simulaatio`
                  : "Aloita simulaatio"}
              </Button>
            }
            text={"Valitse vähintään yksi rivi."}
            hidden={rows.length === 0}
          />
          {(startSimulation || simulationDone) && (
            <ResultList
              onSimulationDone={handleSimulationDone}
              startSimulation={startSimulation}
              years={years}
              rows={rows}
              key={resultListKey}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default LottoPage;
