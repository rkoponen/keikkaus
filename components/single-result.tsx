import React from "react";
import { BsPCircleFill, BsPlusLg } from "react-icons/bs";

import { Rowdies } from "next/font/google";
import { LotteryResult, PlayerNumbers, Result } from "@/types/lotto-types";

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
  lotteryResult: LotteryResult;
  playerResults: Result[];
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
          <BsPlusLg className="text-xl" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-400 bg-slate-100 sm:h-10 sm:w-10">
            {props.lotteryResult.extraNumber}
          </div>
          <BsPCircleFill />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 sm:h-10 sm:w-10">
            {props.lotteryResult.plusNumber}
          </div>
        </div>
        <span>Rivisi</span>
        {props.rows.map((row, rowIndex) => {
          const winAmount = props.playerResults[rowIndex].winAmount;
          const win = winAmount > 0;
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
                        props.playerResults[rowIndex].correctNumbers.includes(
                          number,
                        )
                          ? "bg-green-200"
                          : "bg-slate-100"
                      } ${
                        number === props.lotteryResult.extraNumber
                          ? "border border-green-400"
                          : "border-none"
                      }`}
                    >
                      {number}
                    </div>
                  );
                })}
                {row.plusNumber && (
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 ${
                      props.playerResults[rowIndex].plusCorrect
                        ? "bg-purple-200"
                        : "bg-none"
                    }`}
                  >
                    {row.plusNumber}
                  </div>
                )}
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <span className="">
                  Osumat: {props.playerResults[rowIndex].correctNumbers.length}{" "}
                  {props.playerResults[rowIndex].extraCorrect ? "+ 1" : ""}
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
        })}
      </div>
    </div>
  );
};

export default SingleResult;
