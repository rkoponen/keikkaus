import React from "react";
import { BsPCircleFill, BsPlusLg } from "react-icons/bs";

import {
  GeneratedNumbers,
  PlayerNumbers,
  LottoResult,
  PlayerResult,
  isLottoNumbers,
  isPlayerResult,
  isLottoResult,
} from "@/types/lotto-types";

interface LotteryNumberProps {
  number: number;
}

const LotteryNumber: React.FC<LotteryNumberProps> = ({ number }) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-green-200 md:h-10 md:w-10">
      {number}
    </div>
  );
};

interface SingleResultProps {
  lotteryResult: GeneratedNumbers;
  playerResults: PlayerResult[];
  rows: PlayerNumbers[];
  week: number;
}

const SingleResult: React.FC<SingleResultProps> = (props) => {
  return (
    <div key={props.week} className="w-full bg-white py-2">
      <div className="flex flex-col">
        <span> Arvonta: {props.week}.</span>
        <span>Oikea rivi</span>
        <div className="my-2 flex flex-row items-center justify-between gap-1 rounded-lg border p-2">
          {props.lotteryResult.numbers.map((number, index) => (
            <LotteryNumber key={index} number={number} />
          ))}
          {isLottoNumbers(props.lotteryResult) && (
            <div className="flex flex-row items-center justify-between gap-1">
              <BsPlusLg className="text-xl" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-400 bg-slate-100 sm:h-10 sm:w-10">
                {props.lotteryResult.extraNumber}
              </div>
              <BsPCircleFill />
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 sm:h-10 sm:w-10">
                {props.lotteryResult.plusNumber}
              </div>
            </div>
          )}
        </div>
        <span>Rivisi</span>
        {props.rows.map((row, rowIndex) => {
          // console.log(props.playerResults[rowIndex]);
          if (
            isPlayerResult(props.playerResults[rowIndex]) &&
            props.playerResults[rowIndex]
          ) {
            const winAmount = props.playerResults[rowIndex].result!.winAmount;
            const win = winAmount > 0;
            const result = props.playerResults[rowIndex].result!;
            return (
              <div
                className="mb-2 flex flex-col gap-2 rounded-xl border p-2 sm:flex-row sm:gap-6"
                key={rowIndex}
              >
                <div className="flew-row flex items-center justify-between gap-2">
                  {row.numbers.map((number, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-center ${
                          props.playerResults[
                            rowIndex
                          ].result!.correctNumbers.includes(number)
                            ? "bg-green-200"
                            : "bg-slate-100"
                        } ${
                          isLottoResult(result) &&
                          isLottoNumbers(props.lotteryResult) &&
                          number === props.lotteryResult.extraNumber
                            ? "border border-green-400"
                            : "border-none"
                        }`}
                      >
                        {number}
                      </div>
                    );
                  })}
                  {isLottoNumbers(row) && row.plusNumber && (
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 ${
                        isLottoResult(result) && result.plusCorrect
                          ? "bg-purple-200"
                          : "bg-none"
                      }`}
                    >
                      {row.plusNumber}
                    </div>
                  )}
                </div>
                <div className="flex w-full flex-row items-center justify-between md:flex-col">
                  <span className="">
                    Osumat: {result.correctNumbers.length}{" "}
                    {isLottoResult(result) && result.extraCorrect ? "+ 1" : ""}
                  </span>
                  <span
                    className={`${
                      win ? "bg-green-200" : "bg-red-200"
                    } rounded-lg border p-2 text-xs`}
                  >
                    {win ? `Voitto: ${winAmount}€` : "Ei voittoa"}
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SingleResult;
