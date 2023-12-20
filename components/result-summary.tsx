import React from "react";
import { Button } from "./ui/button";
import { BestAonResult } from "@/types/aon-types";
import { BestResult } from "@/types/lotto-types";

interface ResultSummaryProps {
  wins: number;
  moneyUsed: number;
  bestResult: BestResult | BestAonResult;
  handleClick: () => void;
}

const isBestResult = (
  result: BestResult | BestAonResult
): result is BestResult => {
  return (result as BestResult).result !== undefined;
};

const ResultSummary = (props: ResultSummaryProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="bg-green-200 flex flex-col justify-center items-center p-8 w-1/2 rounded-tl-lg">
          <p>Voitot</p>
          <p className="text-xl">
            {props.wins.toLocaleString("fi-FI", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </div>
        <div className="bg-red-200 flex flex-col justify-center items-center p-8 w-1/2 rounded-tr-lg">
          <p>Rahaa käytetty</p>
          <p className="text-xl">
            {props.moneyUsed.toLocaleString("fi-FI", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </div>
      </div>
      <div className="w-full bg-cyan-200 flex flex-col justify-center items-center p-8 rounded-b-lg">
        <p className="">Paras tulos</p>
        <p className="text-lg">
          {props.bestResult?.result.correctNumbers.length}
          {isBestResult(props.bestResult) &&
          props.bestResult.result.extraCorrect
            ? " + 1"
            : ""}{" "}
          oikein
        </p>
        <p className="text-lg">
          Voitto:{" "}
          {props.bestResult?.result.winAmount.toLocaleString("fi-FI", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
        <Button onClick={props.handleClick}>Näytä</Button>
      </div>
    </div>
  );
};

export default ResultSummary;
