import React from "react";
import { BsPCircleFill, BsPlusLg } from "react-icons/bs";

import { Rowdies } from "next/font/google";
import { LotteryResult, PlayerNumbers, Result } from "@/types/lotto-types";

interface LotteryNumberProps {
  number: number;
}

const LotteryNumber: React.FC<LotteryNumberProps> = ({ number }) => {
  return (
    <div className="border rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-green-200">
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
        <div className="flex flex-row border p-2 gap-1 justify-between items-center rounded-lg my-2">
          {props.lotteryResult.numbers.map((number, index) => (
            <LotteryNumber key={index} number={number} />
          ))}
          <BsPlusLg className="text-xl" />
          <div className="border rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-slate-100 border-green-400">
            {props.lotteryResult.extraNumber}
          </div>
          <BsPCircleFill />
          <div className="border rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center border-purple-500">
            {props.lotteryResult.plusNumber}
          </div>
        </div>
        <span>Rivisi</span>
        {props.rows.map((row, rowIndex) => {
          const winAmount = props.playerResults[rowIndex].winAmount;
          const win = winAmount > 0;
          return (
            <div
              className="border p-2 rounded-xl mb-2 flex flex-col sm:flex-row gap-2 sm:gap-6"
              key={rowIndex}
            >
              <div className="flex flew-row justify-between items-center gap-2">
                {row.numbers.map((number, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-center border rounded-full text-center w-8 h-8 ${
                        props.playerResults[rowIndex].correctNumbers.includes(
                          number
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
                    className={`flex items-center justify-center border border-purple-500 rounded-full w-8 h-8 ${
                      props.playerResults[rowIndex].plusCorrect
                        ? "bg-purple-200"
                        : "bg-none"
                    }`}
                  >
                    {row.plusNumber}
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="">
                  Osumat: {props.playerResults[rowIndex].correctNumbers.length}{" "}
                  {props.playerResults[rowIndex].extraCorrect ? "+ 1" : ""}
                </span>
                <span
                  className={`${
                    win ? "bg-green-200" : "bg-red-200"
                  } p-2 border rounded-lg text-xs`}
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
