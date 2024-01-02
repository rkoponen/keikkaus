import { AonNumbers, AonResult } from "@/types/aon-types";
import React from "react";

import { LuClover } from "react-icons/lu";

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

interface SingleAonResultProps {
  aonNumbers: AonNumbers;
  playerResults: AonResult[];
  rows: AonNumbers[];
  week: number;
}

const SingleAonResult: React.FC<SingleAonResultProps> = (props) => {
  return (
    <div key={props.week} className="w-full py-2">
      <div className="flex flex-col">
        <span> Arvonta: {props.week}.</span>
        <span>Oikea rivi</span>
        <div className="my-2 flex flex-row items-center justify-between gap-1 rounded-lg border p-2">
          <div className="grid grid-cols-6 gap-1 sm:flex sm:flex-row">
            {props.aonNumbers.numbers.map((number, index) => (
              <LotteryNumber key={index} number={number} />
            ))}
          </div>
          <div className="flex flex-row items-center gap-1">
            <LuClover className="text-xl" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-400 sm:h-10 sm:w-10">
              {props.aonNumbers.luckyClover}
            </div>
          </div>
        </div>
        <span>Rivisi</span>
        {props.rows.map((row, rowIndex) => {
          const winAmount = props.playerResults[rowIndex].winAmount;
          const win = winAmount > 0;
          return (
            <div
              className="mb-2 flex flex-col gap-2 rounded-xl border p-2 sm:gap-6 md:flex-row"
              key={rowIndex}
            >
              <div className="flew-row flex items-center justify-between gap-2">
                <div className="grid grid-cols-6 gap-2 sm:flex sm:flex-row">
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
                        }`}
                      >
                        {number}
                      </div>
                    );
                  })}
                </div>
                {row.luckyClover && (
                  <div className="flex flex-row items-center gap-2">
                    <LuClover className="text-xl" />
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-green-500 ${
                        props.playerResults[rowIndex].cloverCorrect
                          ? "bg-green-200"
                          : "bg-none"
                      }`}
                    >
                      {row.luckyClover}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <span className="">
                  Osumat: {props.playerResults[rowIndex].correctNumbers.length}
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

export default SingleAonResult;
