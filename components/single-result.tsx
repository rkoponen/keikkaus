import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import {
  LotteryResult,
  Result,
  checkResult,
  selectLotteryNumbers,
} from "@/app/utils/lotto-utils";

interface LotteryNumberProps {
  number: number;
}

const LotteryNumber: React.FC<LotteryNumberProps> = ({ number }) => {
  return (
    <div className="border rounded-full text-center text-lg mx-2 bg-green-200">
      {number}
    </div>
  );
};

interface SingleResultProps {
  rows: number[][];
  week: number;
}

const SingleResult: React.FC<SingleResultProps> = (props) => {
  const [lotteryResult, setLotteryResult] = useState<LotteryResult>(
    selectLotteryNumbers()
  );

  const playerResults: Result[] = props.rows.map((row) =>
    checkResult(row, lotteryResult)
  );

  return (
    <li key={props.week} className="my-6 w-full">
      <div className="flex flex-col">
        <span>Oikea rivi</span>
        <div className="grid grid-cols-9 border p-2 justify-between items-center">
          {lotteryResult?.numbers.map((number, index) => (
            <LotteryNumber key={index} number={number} />
          ))}
          <BsPlusLg className="text-2xl mx-2" />
          <LotteryNumber number={lotteryResult?.extraNumber!} />
        </div>
        <span>Rivisi</span>
        {props.rows.map((row, rowIndex) => {
          return (
            <div className="border">
              <div
                key={rowIndex}
                className="grid grid-cols-9 p-2 justify-between items-center"
              >
                {row.map((number, index) => {
                  return (
                    <div
                      className={`border rounded-full text-center text-lg mx-2 ${
                        playerResults[rowIndex].correctNumbers.includes(number) || number === lotteryResult.extraNumber
                          ? "bg-green-200"
                          : "bg-slate-100"
                      }`}
                    >
                      {number}
                    </div>
                  );
                })}
              </div>
              <div>
                <span className="font-regular">Osumat: {playerResults[rowIndex].correctNumbers.length} {playerResults[rowIndex].extraCorrect ? '+ 1' : ''}</span>
              </div>
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default SingleResult;
