import React, { useEffect, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import { CSSProperties } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import ResultSummary from "./result-summary";
import {
  checkAonResult,
  selectAonNumbers,
} from "@/app/utils/aon-utils";
import SingleAonResult from "./single-aon-result";
import { AonNumbers, AonResult, BestAonResult } from "@/types/aon-types";

interface AonResultsProps {
  key: number;
  years: number;
  rows: AonNumbers[];
  onSimulationDone: () => void;
  startSimulation: boolean;
  betSize: number;
}


const AonResults = (props: AonResultsProps) => {
  const weeks = props.years * 52;
  const [resultList, setResultList] = useState<React.JSX.Element[]>([]);
  const [week, setWeek] = useState<number>(1);
  const [wins, setWins] = useState<number>(0);
  const [moneyUsed, setMoneyUsed] = useState<number>(0);
  const [bestResult, setBestResult] = useState<BestAonResult | null>(null);

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
            const lotteryResult: AonNumbers = selectAonNumbers();

            const playerResults: AonResult[] = props.rows.map((row) => {
              const result = checkAonResult(row, lotteryResult, props.betSize);
              newWins += result.winAmount;
              row.luckyClover
                ? (newMoneyUsed += props.betSize * 2)
                : (newMoneyUsed += props.betSize);

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
              <SingleAonResult
                aonNumbers={lotteryResult}
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
      if (listRef.current) {
        listRef.current.scrollToItem(resultList.length - 1, "start");
      }
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

  const handleClickJump = () => {
    if (listRef.current && bestResult?.index)
      listRef.current.scrollToItem(bestResult?.index, "start");
  };

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`flex w-full ${
          props.rows.length < 4 ? "h-3/4 sm:h-1/3" : "h-1/2"
        } my-2 sm:my-6 border rounded-lg p-1`}
      >
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
      {bestResult && (
        <ResultSummary
          wins={wins}
          moneyUsed={moneyUsed}
          handleClick={handleClickJump}
          bestResult={bestResult}
        />
      )}
    </div>
  );
};

export default AonResults;
