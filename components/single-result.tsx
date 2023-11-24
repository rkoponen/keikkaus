import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import {
  LotteryResult,
  Result,
  calculateWinAmount,
  checkResult,
  selectLotteryNumbers,
} from "@/app/utils/lotto-utils";
import { Rowdies } from "next/font/google";

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
  lotteryResult: LotteryResult;
  playerResults: Result[];
  rows: number[][];
  week: number;
}

const SingleResult: React.FC<SingleResultProps> = (props) => {
  return (
    <li key={props.week} className="my-6 w-full">
      <div className="flex flex-col">
        <span> Viikko: {props.week}</span>
        <span>Oikea rivi</span>
        <div className="grid grid-cols-9 border p-2 justify-between items-center m-2">
          {props.lotteryResult.numbers.map((number, index) => (
            <LotteryNumber key={index} number={number} />
          ))}
          <BsPlusLg className="text-2xl mr-auto ml-auto" />
          <div className="border rounded-full text-center text-lg mx-2 bg-slate-100 border-green-400">
            {props.lotteryResult.extraNumber}
          </div>
        </div>
        <span>Rivisi</span>
        {props.rows.map((row, rowIndex) => {
          const winAmount = props.playerResults[rowIndex].winAmount;
          const win = winAmount > 0;
          return (
            <div className="border p-2 rounded-xl mb-2" key={rowIndex}>
              <div className="grid grid-cols-9 p-2 justify-between items-center">
                {row.map((number, index) => {
                  return (
                    <div
                      key={index}
                      className={`border rounded-full text-center text-lg mx-2 ${
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
              </div>
              <div className="flex flex-row items-center">
                <span className="font-regular mx-6">
                  Osumat: {props.playerResults[rowIndex].correctNumbers.length}{" "}
                  {props.playerResults[rowIndex].extraCorrect ? "+ 1" : ""}
                </span>
                <span
                  className={`${
                    win ? "bg-green-200" : "bg-red-200"
                  } mx-6 p-1 border rounded-lg`}
                >
                  {win ? `Voitto: ${winAmount}€` : "Ei voittoa"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default SingleResult;
