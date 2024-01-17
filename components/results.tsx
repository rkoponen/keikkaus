import React, { useEffect, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import { CSSProperties } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import ResultSummary from "./result-summary";
import { selectAonNumbers } from "@/app/utils/aon-utils";
import { Games } from "@/types/enum";
import { BestResult, PlayerResult, PlayerRows } from "@/types/lotto-types";
import { selectLotteryNumbers } from "@/app/utils/lotto-utils";
import { checkResults } from "@/app/utils/number-utils";
import SingleResult from "./single-result";

interface ResultsProps {
  game: Games;
  key: number;
  years: number;
  rows: PlayerRows;
  onSimulationDone: () => void;
  startSimulation: boolean;
  betSize: number;
}

const Results = (props: ResultsProps) => {
  const weeks = props.years * 52;
  const [resultList, setResultList] = useState<React.JSX.Element[]>([]);
  const [week, setWeek] = useState<number>(1);
  const [wins, setWins] = useState<number>(0);
  const [moneyUsed, setMoneyUsed] = useState<number>(0);
  const [bestResult, setBestResult] = useState<BestResult | null>(null);
  const [simulationFinished, setSimulationFinished] = useState(false);

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
            const generatedNumbers =
              props.game === Games.Lotto
                ? selectLotteryNumbers()
                : selectAonNumbers();

            const playerResults: PlayerResult[] = props.rows.map((row) => {
              const result = checkResults(
                props.game,
                row,
                generatedNumbers,
                props.betSize,
              );
              if (result.result) {
                newWins += result.result.winAmount;
                newMoneyUsed += result.moneyUsed!;
                if (
                  !newBestResult ||
                  result.result.winAmount > newBestResult.result.winAmount
                ) {
                  newBestResult = { result: result.result, index: i - 1 };
                }
              }
              return result;
            });
            newItems.push(
              <SingleResult
                lotteryResult={generatedNumbers}
                playerResults={playerResults}
                rows={props.rows}
                week={i}
                key={i}
              />,
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
          setSimulationFinished(true);
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
    <div className="flex h-screen flex-col">
      <div
        className={`flex w-full ${
          props.rows.length < 4 ? "h-3/4 sm:h-1/3" : "h-1/2"
        } my-2 rounded-lg border p-1 sm:my-6`}
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
          game={props.game}
          simulationFinished={simulationFinished}
        />
      )}
    </div>
  );
};

export default Results;
