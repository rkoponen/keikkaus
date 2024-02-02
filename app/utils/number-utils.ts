import { AonNumbers } from "@/types/lotto-types";
import { Games } from "@/types/enum";
import {
  GeneratedNumbers,
  PlayerNumbers,
  PlayerResult,
  isAonNumbers,
  isLottoNumbers,
} from "@/types/lotto-types";
import { checkLottoResult } from "./lotto-utils";
import { checkAonResult } from "./aon-utils";

export const sortNumbers = (numbers: number[], newNumber: number) => {
  return [...numbers, newNumber].sort((a, b) => a - b);
};

export const selectNumbersFromRange = (maxNumber: number, amount: number) => {
  const numbers = Array.from({ length: maxNumber }, (_, index) => index + 1);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const selectedNumbers = numbers.slice(0, amount);

  return selectedNumbers.sort((a, b) => a - b);
};

export const formatMoney = (money: number): string => {
  return money.toLocaleString("fi-FI", {
    style: "currency",
    currency: "EUR",
  });
};

export const checkResults = (
  game: Games,
  playerRow: PlayerNumbers,
  generatedRow: GeneratedNumbers,
  betSize: number,
): PlayerResult => {
  console.log("hello!");
  if (
    game === Games.AllOrNothing &&
    isAonNumbers(generatedRow) &&
    isAonNumbers(playerRow)
  ) {
    const result = checkAonResult(
      playerRow as AonNumbers,
      generatedRow,
      betSize,
    );
    const moneyUsed = playerRow.luckyClover ? betSize * 2 : betSize;
    return {
      result: result,
      moneyUsed: moneyUsed,
    };
  } else if (
    game === Games.Lotto &&
    isLottoNumbers(generatedRow) &&
    isLottoNumbers(playerRow)
  ) {
    console.log("hello!");
    const result = checkLottoResult(playerRow, generatedRow);
    return {
      result: result,
      moneyUsed: playerRow.plusNumber ? 1.5 : 1,
    };
  }
  return {};
};
