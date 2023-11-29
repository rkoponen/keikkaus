"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import React, { useRef, useState } from "react";
import { BsChat, BsPencil, BsTrash3, BsTrash3Fill } from "react-icons/bs";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-2 sm:p-24">
      <div className="z-10 flex flex-col gap-6 w-full lg:w-1/2 items-center justify-center font-mono text-sm">
        <h1 className="text-xl">Lotto</h1>
        <div>
          <Button onClick={handleRowClick}>Rivit</Button>
          <Button onClick={() => setYears(1)}>Vuodet</Button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg">Valitse numerot</h1>
          <div
            ref={numbersDivRef}
            className="grid grid-cols-8 gap-2 grid-rows-5 sm:grid-cols-10 sm:grid-rows-4 rounded-lg w-full "
          >
            {lottoNumbers.map((x) => {
              const selected = selectedNumbers.includes(x);
              return (
                <div
                  key={x}
                  onClick={() => handleClick(x)}
                  className={`bg-cyan-600 hover:bg-green-400 rounded-full flex justify-center text-sm h-12 w-12 items-center text-slate-100 hover:shadow-lg cursor-pointer ${
                    selected ? "bg-green-500" : ""
                  }`}
                >
                  {x}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-lg text-center">Valitut numerot</h2>
          <div className="p-2 border rounded-xl border-cyan-600">
            <div className="text-center flex flex-row justify-between">
              {Array.from({ length: 7 }, (x, i) => i).map((x) => {
                return (
                  <span
                    key={x}
                    className="border border-cyan-200 rounded-full w-10 h-10 p-1 text-lg m-1"
                  >
                    <div className="h-full flex  items-center justify-center">
                      {selectedNumbers[x] ? selectedNumbers[x] : ""}
                    </div>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-lg text-center">Valitut rivit</h2>
          {rows.length > 0 ? (
            <div className="w-full">
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="flex flex-row mt-2 p-2 border rounded-xl justify-between items-center text-center w-full"
                >
                  {row.map((number, innerIndex) => (
                    <div
                      key={innerIndex}
                      className="flex items-center justify-center border rounded-full p-1 w-10 h-10 m-1 text-sm"
                      data-testid="selected-number"
                    >
                      {number}
                    </div>
                  ))}
                  <button
                    className="bg-red-500 text-white w-10 h-10 rounded-full flex justify-center items-center"
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
        <div className="w-full md:w-3/4 text-center">
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
        <div className="w-full md:w-3/4 h-screen" ref={scrollContainerRef}>
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
