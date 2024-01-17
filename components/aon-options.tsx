"use client";
import { selectClover } from "@/app/utils/aon-utils";
import { sortNumbers, selectNumbersFromRange } from "@/app/utils/number-utils";
import { AonNumbers } from "@/types/aon-types";
import React, { useRef, useState } from "react";
import { LuClover } from "react-icons/lu";
import { ButtonTooltip } from "./button-tooltip";
import ChosenNumbers from "./chosen-numbers";
import ChosenRows from "./chosen-rows";
import NumberGrid from "./number-grid";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import Results from "./results";
import { Games } from "@/types/enum";

const AonOptions = () => {
  const [rows, setRows] = useState<AonNumbers[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [years, setYears] = useState<number>(25);
  const [betSize, setBetSize] = useState<number>(1);
  const [cloverSelected, setCloverSelected] = useState(false);
  const [startSimulation, setStartSimulation] = useState(false);
  const [simulationDone, setSimulationDone] = useState(false);
  const [resultKey, setResultKey] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const length = 12;

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      const newNumbers = selectedNumbers.filter((x) => x !== number);
      setSelectedNumbers(newNumbers);
    } else if (selectedNumbers.length < length) {
      if (selectedNumbers.length === length - 1) {
        const newNumbers: AonNumbers = {
          numbers: sortNumbers(selectedNumbers, number),
          luckyClover: cloverSelected ? selectClover() : undefined,
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

  const handleClickSimulation = () => {
    setSimulationDone(false);
    const started = !startSimulation;
    setStartSimulation(started);
    setResultKey((prev) => prev + 1);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  };

  const handleSliderChange = (value: number[]) => {
    setYears(value[0]);
  };

  const handleClickBetsize = (change: number) => {
    setBetSize(betSize + change);
  };

  const handleSwitchChange = () => {
    let clover = !cloverSelected;
    setCloverSelected(clover);
    if (clover) {
      let newRows = rows;
      newRows.forEach((row) => {
        row.luckyClover = selectClover();
      });
      setRows(newRows);
    } else {
      let newRows = rows;
      newRows.forEach((row) => {
        row.luckyClover = undefined;
      });
      setRows(newRows);
    }
  };

  const handleSimulationDone = () => {
    setSimulationDone(true);
    setStartSimulation(false);
  };

  const handleRandomClick = () => {
    let newRow = selectNumbersFromRange(24, 12);
    const newNumbers: AonNumbers = {
      numbers: newRow,
      luckyClover: cloverSelected ? selectClover() : undefined,
    };
    setRows([...rows, newNumbers]);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="rounded-lg border border-black p-2">
        <h1 className="font-mono text-2xl font-bold italic tracking-widest text-slate-600">
          Kaikki tai ei mitään
        </h1>
      </div>
      <NumberGrid
        length={length}
        selectableLength={24}
        handleNumberClick={handleNumberClick}
        selectedNumbers={selectedNumbers}
      />
      <ChosenNumbers selectedNumbers={selectedNumbers} length={length} />
      <Button onClick={handleRandomClick} className="w-full">
        Arvo rivi
      </Button>
      <ChosenRows rows={rows} handleClickDelete={handleClickDelete} />
      <div className="flex w-full flex-col items-center justify-center gap-8 sm:flex-row">
        <div className="flex flex-col items-center justify-center">
          <span>Aseta panos</span>
          <div className="flex flex-row items-center justify-between gap-4">
            <Button
              className="flex h-8 w-8 items-center justify-center p-1 text-xl"
              onClick={() => handleClickBetsize(-0.5)}
              disabled={betSize === 1}
            >
              -
            </Button>
            <span className="text-lg">
              {betSize.toLocaleString("fi-FI", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            <Button
              className="flex h-8 w-8 items-center justify-center p-1 text-xl"
              onClick={() => handleClickBetsize(0.5)}
              disabled={betSize === 5}
            >
              +
            </Button>
          </div>
        </div>
        {rows.length > 0 && (
          <div className="flex flex-col items-center space-x-2 rounded-lg">
            <span>
              Onnenapila?{" "}
              {betSize.toLocaleString("fi-FI", {
                style: "currency",
                currency: "EUR",
              })}
              /rivi.
            </span>
            <div className="flex h-8 flex-row items-center gap-4">
              <Switch
                id="lucky-clover-switch"
                onCheckedChange={handleSwitchChange}
              />
              <LuClover className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>
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
            game={Games.AllOrNothing}
            onSimulationDone={handleSimulationDone}
            startSimulation={startSimulation}
            years={years}
            rows={rows}
            key={resultKey}
            betSize={betSize}
          />
        )}
      </div>
    </div>
  );
};

export default AonOptions;
