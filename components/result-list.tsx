import React, { useEffect, useRef, useState } from "react";
import SingleResult from "./single-result";
import {
  LotteryResult,
  Result,
  calculateWinAmount,
  checkResult,
  selectLotteryNumbers,
} from "@/app/utils/lotto-utils";
import { BsPlusLg } from "react-icons/bs";
import { setTimeout } from "timers";
import { render } from "@testing-library/react";

interface ResultListProps {
  key: number;
  years: number;
  rows: number[][];
  onSimulationDone: () => void;
  startSimulation: boolean;
}

const ResultList = (props: ResultListProps) => {
  const weeks = props.years * 52;
  const [resultList, setResultList] = useState<React.JSX.Element[]>([]);
  const [week, setWeek] = useState<number>(1);
  const [wins, setWins] = useState<number>(0);
  const [moneyUsed, setMoneyUsed] = useState<number>(0);
  const [bestResult, setBestResult] = useState<Result | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.startSimulation) {
      const addNewItems = () => {
        if (week <= weeks) {
          let newWins = wins;
          let newMoneyUsed = moneyUsed;
          let newBestResult = bestResult;
          const newItems: React.JSX.Element[] = [];
          const renderSpeed = props.years > 20 ? Math.round(props.years / 10) + 2 : 1
          for (let i = week; i < week + renderSpeed && i <= weeks; i++) {
            const lotteryResult = selectLotteryNumbers();

            const playerResults: Result[] = props.rows.map((row) => {
              const result = checkResult(row, lotteryResult);
              newWins += result.winAmount;
              newMoneyUsed += 1;

              if (
                !newBestResult ||
                result.winAmount > newBestResult.winAmount
              ) {
                newBestResult = result;
              }

              return result;
            });
            newItems.push(
              <SingleResult
                lotteryResult={lotteryResult}
                playerResults={playerResults}
                rows={props.rows}
                week={i}
              />
            );
          }
          setWeek(week + renderSpeed);
          setMoneyUsed(newMoneyUsed);
          setWins(newWins);
          setResultList((prevItems) => [...prevItems, ...newItems]);
          setBestResult(newBestResult);
        } else {
          clearInterval(intervalId);
          props.onSimulationDone();
        }
      };
      // const intervalDuration = Math.max(25000 / weeks, 50);
      const intervalDuration = props.years < 20 ? 20 : 50
      const intervalId = setInterval(addNewItems, intervalDuration);

      return () => clearInterval(intervalId);
    }
  }, [week, weeks, props.rows, moneyUsed, wins, bestResult, props]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [resultList]);

  return (
    <div className="">
      <div
        className="overflow-y-scroll h-96 mb-6 border p-2 rounded-xl"
        ref={scrollContainerRef}
      >
        <ul>{resultList}</ul>
      </div>
      <div className="flex flex-row justify-between">
        <div className="bg-green-200 flex flex-col justify-center items-center p-8 w-1/2 rounded-tl-lg">
          <p>Voitot</p>
          <p className="text-xl">{wins}€</p>
        </div>
        <div className="bg-red-200 flex flex-col justify-center items-center p-8 w-1/2 rounded-tr-lg">
          <p>Rahaa käytetty</p>
          <p className="text-xl">{moneyUsed}€</p>
        </div>
      </div>
      <div className="w-full bg-cyan-200 flex flex-col justify-center items-center p-8 rounded-b-lg">
        <p className="">Paras tulos</p>
        <p className="text-lg">
          {bestResult?.correctNumbers.length}
          {bestResult?.extraCorrect ? " + 1" : ""} oikein
        </p>
        <p className="text-lg">Voitto: {bestResult?.winAmount}€</p>
      </div>
    </div>
  );
};

export default ResultList;
