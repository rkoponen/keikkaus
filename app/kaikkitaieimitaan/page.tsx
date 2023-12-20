"use client";
import NumberGrid from "@/components/number-grid";
import ChosenNumbers from "@/components/chosen-numbers";
import { useState } from "react";
import { sortNumbers } from "../utils/number-utils";
import ChosenRows from "@/components/chosen-rows";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { selectClover } from "../utils/aon-utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LuClover } from "react-icons/lu";
import { ButtonTooltip } from "@/components/button-tooltip";
import AonResults from "@/components/aon-results";
import { AonNumbers } from "../../types/aon-types";

const AoNPage = () => {
  const [rows, setRows] = useState<AonNumbers[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [years, setYears] = useState<number>(25);
  const [betSize, setBetSize] = useState<number>(1);
  const [cloverSelected, setCloverSelected] = useState(false);
  const [startSimulation, setStartSimulation] = useState(false);
  const [simulationDone, setSimulationDone] = useState(false);
  const [resultKey, setResultKey] = useState<number>(0);

  const length = 12;

  const handleNumberClick = (number: number) => {
    console.log("hello");
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="z-10 flex flex-col gap-6 w-full lg:w-6/12 items-center justify-center font-mono text-sm">
        <NumberGrid
          length={length}
          selectableLength={24}
          handleNumberClick={handleNumberClick}
          selectedNumbers={selectedNumbers}
        />
        <ChosenNumbers selectedNumbers={selectedNumbers} length={length} />
        <ChosenRows rows={rows} handleClickDelete={handleClickDelete} />
        <div className="flex flex-col justify-center items-center">
          <span>Aseta panos</span>
          <div className="flex flex-row justify-between items-center gap-4">
            <Button
              className="flex items-center justify-center p-1 text-xl w-8 h-8"
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
              className="flex items-center justify-center p-1 text-xl w-8 h-8"
              onClick={() => handleClickBetsize(0.5)}
              disabled={betSize === 5}
            >
              +
            </Button>
          </div>
        </div>
        {rows.length > 0 && (
          <div className="flex items-center space-x-2">
            <Label htmlFor="lucky-clover-switch">
              Onnenapila?{" "}
              {betSize.toLocaleString("fi-FI", {
                style: "currency",
                currency: "EUR",
              })}
              /rivi.
            </Label>
            <Switch
              id="lucky-clover-switch"
              onCheckedChange={handleSwitchChange}
            />
            <LuClover className="w-6 h-6" />
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
        <div className="w-full h-screen">
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
            <AonResults
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
    </main>
  );
};

export default AoNPage;
