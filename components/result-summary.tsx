import React, { useState } from "react";
import { Button } from "./ui/button";
import { BestResult, BestAonResult, isLottoResult } from "@/types/lotto-types";
import { Games } from "@/types/enum";
import { addScore } from "@/lib/create-utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Highscore } from "@/types/highscore";

interface ResultSummaryProps {
  wins: number;
  moneyUsed: number;
  bestResult: BestResult;
  game: Games;
  simulationFinished: boolean;
  handleClick: () => void;
}

const isBestResult = (
  result: BestResult | BestAonResult,
): result is BestResult => {
  return (result as BestResult).result !== undefined;
};

const ResultSummary = (props: ResultSummaryProps) => {
  const [nickname, setNickname] = useState("");
  const [saved, setSaved] = useState(false);

  const handleClickSave = async () => {
    setSaved(true);
    const score: Highscore = {
      nickname: nickname,
      score: props.bestResult.result.winAmount,
      game: props.game,
    };
    await addScore(score);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex w-1/2 flex-col items-center justify-center rounded-tl-lg bg-green-200 p-8">
          <p>Voitot</p>
          <p className="text-xl">
            {props.wins.toLocaleString("fi-FI", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center rounded-tr-lg bg-red-200 p-8">
          <p>Rahaa käytetty</p>
          <p className="text-xl">
            {props.moneyUsed.toLocaleString("fi-FI", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center rounded-b-lg bg-cyan-200 p-8">
        <p className="">Paras tulos</p>
        <p className="text-lg">
          {props.bestResult?.result.correctNumbers.length}
          {isLottoResult(props.bestResult.result) &&
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
        {props.simulationFinished && (
          <div className="mt-2 flex flex-row items-center justify-center gap-6">
            <Button onClick={props.handleClick}>Näytä</Button>
            {!saved && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button>Tallenna tulos</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-slate-100">
                  <div className="flex flex-col">
                    <label htmlFor="nickname" className="text-sm">
                      Nimimerkki
                    </label>
                    <input
                      id="nickname"
                      className="border-grey rounded-md border p-1"
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    {nickname.length > 20 && (
                      <span className="text-sm text-red-300">
                        Nimimerkin maksimipituus on 20 merkkiä.
                      </span>
                    )}
                    <Button
                      className="disable:bg-grey mt-4"
                      disabled={nickname.length < 1 || nickname.length > 20}
                      onClick={handleClickSave}
                    >
                      Tallenna
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultSummary;
