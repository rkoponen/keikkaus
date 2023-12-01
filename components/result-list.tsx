import React, { createRef, useEffect, useRef, useState } from "react";
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
import { VariableSizeList as List } from "react-window";
import { CSSProperties } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { Button } from "./ui/button";
import { PlayerNumbers } from "@/app/lotto/page";

interface ResultListProps {
  key: number;
  years: number;
  rows: PlayerNumbers[];
  onSimulationDone: () => void;
  startSimulation: boolean;
}

type BestResult = {
  result: Result;
  index: number;
};

const ResultList = (props: ResultListProps) => {
  const weeks = props.years * 52;
  const [resultList, setResultList] = useState<React.JSX.Element[]>([]);
  const [week, setWeek] = useState<number>(1);
  const [wins, setWins] = useState<number>(0);
  const [moneyUsed, setMoneyUsed] = useState<number>(0);
  const [bestResult, setBestResult] = useState<BestResult | null>(null);

  const listRef = useRef<List>(null);

  const rowHeight = useRef<number>();

  useEffect(() => {
    if (props.startSimulation) {
      const addNewItems = () => {
        if (week <= weeks) {
          let newWins = wins;
          let newMoneyUsed = moneyUsed;
          let newBestResult = bestResult;
          const newItems: React.JSX.Element[] = [];
          const renderSpeed =
            props.years > 20 ? Math.round(props.years / 10) + 3 : 1;
          for (let i = week; i < week + renderSpeed && i <= weeks; i++) {
            const lotteryResult = selectLotteryNumbers();

            const playerResults: Result[] = props.rows.map((row) => {
              const result = checkResult(row, lotteryResult);
              newWins += result.winAmount;
              row.plusNumber ? (newMoneyUsed += 1.5) : (newMoneyUsed += 1);

              if (
                !newBestResult ||
                result.winAmount > newBestResult.result.winAmount
              ) {
                newBestResult = {
                  result: result,
                  index: i - 1,
                };
              }

              return result;
            });
            newItems.push(
              <SingleResult
                lotteryResult={lotteryResult}
                playerResults={playerResults}
                rows={props.rows}
                week={i}
                key={i}
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
      const intervalDuration = props.years < 20 ? 20 : 50;
      const intervalId = setInterval(addNewItems, intervalDuration);

      return () => clearInterval(intervalId);
    }
  }, [week, weeks, props.rows, moneyUsed, wins, bestResult, props]);

  useEffect(() => {
    if (resultList.length > 0) {
      scrollToBottom();
    }
  }, [resultList]);

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const rowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (rowRef.current) {
        rowHeight.current = rowRef.current.clientHeight;
      }
    }, [rowRef]);

    return resultList[index] ? (
      <div style={style}>
        <div ref={rowRef}>{resultList[index]}</div>
      </div>
    ) : null;
  };

  const getRowHeight = () => {
    console.log(`Rowheihgt: ${rowHeight.current}`);
    if (rowHeight.current) {
      return rowHeight.current;
    }
    return props.rows.length * 80 + 200;
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollToItem(resultList.length - 1, "start");
    }
  };

  const handleClickJump = () => {
    if (listRef.current && bestResult?.index)
      listRef.current.scrollToItem(bestResult?.index, "start");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex w-full h-1/2 my-6 border rounded-lg p-1">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={weeks}
              itemSize={getRowHeight}
              width={width}
              ref={listRef}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
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
          {bestResult?.result.correctNumbers.length}
          {bestResult?.result.extraCorrect ? " + 1" : ""} oikein
        </p>
        <p className="text-lg">Voitto: {bestResult?.result.winAmount}€</p>
        <Button onClick={handleClickJump}>Näytä</Button>
      </div>
    </div>
  );
};

export default ResultList;
