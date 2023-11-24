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

interface ResultListProps {
  years: number;
  rows: number[][];
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
    const addNewItems = () => {
      if (week < weeks) {
        let newWins = wins;
        let newMoneyUsed = moneyUsed;
        let newBestResult = bestResult;
        const newItems: React.JSX.Element[] = [];
        for (let i = week; i < week + 10 && i <= weeks; i++) {
          const lotteryResult = selectLotteryNumbers();

          const playerResults: Result[] = props.rows.map((row) => {
            const result = checkResult(row, lotteryResult);
            newWins += result.winAmount;
            newMoneyUsed += 1;

            if (!newBestResult || result.winAmount > newBestResult.winAmount) {
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
        setWeek(week + 10);
        setMoneyUsed(newMoneyUsed);
        setWins(newWins);
        setResultList((prevItems) => [...prevItems, ...newItems]);
        setBestResult(newBestResult);
      } else {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(addNewItems, 50);

    return () => clearInterval(intervalId);
  }, [week, weeks, props.rows, moneyUsed, wins, bestResult]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [resultList]);

  return (
    <div className="">
      <div className="overflow-y-scroll h-96 mb-6 border p-2 rounded-xl" ref={scrollContainerRef}>
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
