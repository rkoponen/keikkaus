"use client";
import { selectPlusNumber } from "@/app/utils/lotto-utils";
import { selectNumbersFromRange, sortNumbers } from "@/app/utils/number-utils";
import { LottoNumbers, PlayerNumbers } from "@/types/lotto-types";
import React, { useRef, useState } from "react";
import { BsPCircle, BsTrash3Fill } from "react-icons/bs";
import { ButtonTooltip } from "./button-tooltip";
import ChosenNumbers from "./chosen-numbers";
import ResultList from "./result-list";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Games } from "@/types/enum";
import Results from "./results";

let lottoNumbers = Array.from({ length: 40 }, (_, index) => {
  return index + 1;
});

const LottoGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [rows, setRows] = useState<LottoNumbers[]>([]);
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
  const handleRandomClick = () => {
    let newRow = selectNumbersFromRange(40, 7);
    const newNumbers: PlayerNumbers = {
      numbers: newRow,
      plusNumber: plusNumber ? selectPlusNumber() : undefined,
    };
    setRows([...rows, newNumbers]);
  };

  return (
    <div className="z-10 flex w-full flex-col items-center justify-center gap-6 font-mono text-sm">
      <div className="rounded-lg border border-black p-2">
        <h1 className="font-mono text-2xl font-bold italic tracking-widest text-slate-600">
          Lotto
        </h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-lg">Valitse numerot</h1>
        <div
          ref={numbersDivRef}
          className="grid w-max grid-cols-8 grid-rows-5 gap-2 rounded-lg sm:grid-cols-10 sm:grid-rows-4"
        >
          {lottoNumbers.map((x) => {
            const selected = selectedNumbers.includes(x);
            return (
              <div
                key={x}
                onClick={() => handleClick(x)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-cyan-600 text-sm text-slate-100 hover:border hover:border-cyan-400 sm:h-12 sm:w-12 ${
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
        <ChosenNumbers selectedNumbers={selectedNumbers} length={7} />
      </div>
      <Button onClick={handleRandomClick} className="w-full">
        Arvo rivi
      </Button>

      <div className="w-full text-center">
        <h2 className="text-center text-lg">Valitut rivit</h2>
        {rows.length > 0 ? (
          <div className="w-full">
            {rows.map((row, index) => (
              <div
                key={index}
                className="mt-2 flex w-full flex-row items-center justify-between gap-1 rounded-xl border p-2 text-center"
              >
                {row.numbers.map((number, innerIndex) => (
                  <div
                    key={innerIndex}
                    className="flex h-8 w-8 items-center justify-center rounded-full border p-1 text-sm sm:h-10 sm:w-10"
                    data-testid="selected-number"
                  >
                    {number}
                  </div>
                ))}
                {row.plusNumber && (
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div>
                      <BsPCircle className="h-6 w-6 rounded-full text-purple-500" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 p-1 sm:h-10 sm:w-10">
                      {row.plusNumber}
                    </div>
                  </div>
                )}
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white sm:h-10 sm:w-10"
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

      <div className="w-full text-center">
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
      <div className="h-screen w-full" ref={scrollContainerRef}>
        <ButtonTooltip
          button={
            <Button
              className="mt-4 w-full"
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
          <Results
            game={Games.Lotto}
            betSize={1}
            onSimulationDone={handleSimulationDone}
            startSimulation={startSimulation}
            years={years}
            rows={rows}
            key={resultListKey}
          />
        )}
      </div>
    </div>
  );
};

export default LottoGame;
