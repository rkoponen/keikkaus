"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import React, { useRef, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { selectLotteryNumbers } from "../utils/lotto-utils";
import ResultList from "@/components/result-list";
import { start } from "repl";
import { ButtonTooltip } from "@/components/button-tooltip";

let lottoNumbers = Array.from({ length: 40 }, (_, index) => {
  return index + 1;
});

const sortNumbers = (numbers: number[], newNumber: number) => {
  return [...numbers, newNumber].sort((a, b) => a - b);
};

const LottoPage = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [rows, setRows] = useState<number[][]>([]);
  const [years, setYears] = useState<number>(25);
  const [startSimulation, setStartSimulation] = useState<boolean>(false);
  const [simulationStarted, setSimulationStarted] = useState<boolean>(false);
  const [resultListKey, setResultListKey] = useState<number>(0);
  const [simulationDone, setSimulationDone] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const numbersDivRef = useRef<HTMLDivElement>(null);

  const handleClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      const newNumbers = selectedNumbers.filter((x) => x !== number);
      setSelectedNumbers(newNumbers);
    } else if (selectedNumbers.length < 7) {
      if (selectedNumbers.length === 6) {
        const newRow = sortNumbers(selectedNumbers, number);
        setRows([...rows, newRow]);
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

  const handleRowClick = () => {
    const newRows = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [16, 17, 18, 19, 20, 21, 22],
      [24, 25, 26, 27, 29, 30, 31],
    ];
    setRows(newRows);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 flex flex-col w-full items-center justify-center font-mono text-sm">
        <div>
          <Button onClick={handleRowClick}>Rivit</Button>
          <Button onClick={() => setYears(1)}>Vuodet</Button>
        </div>
        <h1 className="text-lg">Valitse numerot</h1>
        <div
          ref={numbersDivRef}
          className="grid grid-cols-10 rounded-lg border p-2 w-1/2"
        >
          {lottoNumbers.map((x) => {
            const selected = selectedNumbers.includes(x);
            return (
              <div
                key={x}
                onClick={() => handleClick(x)}
                className={`bg-cyan-600 rounded-full flex justify-center text-sm p-2 m-1 text-slate-100 cursor-pointer ${
                  selected ? "bg-green-500" : ""
                }`}
              >
                {x}
              </div>
            );
          })}
        </div>
        <div className="my-2 w-1/2">
          <div className="flex flex-col justify-center">
            <h2 className="text-lg text-center">Valitsemasi numerot:</h2>
            <div className="text-center grid grid-cols-7">
              {Array.from({ length: 7 }, (x, i) => i).map((x) => {
                return (
                  <span
                    key={x}
                    className="border rounded-full p-1 text-lg m-1 h-8"
                  >
                    <div className="h-full">
                      {selectedNumbers[x] ? selectedNumbers[x] : ""}
                    </div>
                  </span>
                );
              })}
            </div>
            <div className="flex flex-col justify-center items-center text-center my-6">
              <h2 className="text-lg text-center">Rivisi:</h2>
              {rows.length > 0 ? (
                <div className="w-full">
                  {rows.map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-8 text-center w-full"
                    >
                      {row.map((number, innerIndex) => (
                        <span
                          key={innerIndex}
                          className="border rounded-full p-1 text-lg sm:text-sm m-1"
                          data-testid="selected-number"
                        >
                          {number}
                        </span>
                      ))}
                      <button
                        className="bg-red-500 text-white m-1 rounded-full flex justify-center items-center"
                        onClick={() => handleClickDelete(index)}
                        data-testid="delete"
                      >
                        <BsTrash3 />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Valitse vähintään yksi rivi.</p>
              )}
            </div>
            <div className="w-full my-6 text-center">
              <label className="text-lg" htmlFor="slider">
                Kuinka monta vuotta haluat simuloida?
              </label>
              <Slider
                className="my-2"
                id="slider"
                defaultValue={[25]}
                min={1}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
              />
              <span className="text-lg font-medium">{years} vuotta</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 pt-4" ref={scrollContainerRef}>
          <ButtonTooltip
            button={
              <Button
                className="w-full"
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
