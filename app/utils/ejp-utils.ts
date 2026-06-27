
import { EjpNumbers, EjpResult, GeneratedNumbers } from "@/types/lotto-types";
import { selectNumbersFromRange } from "./number-utils";
import prizeData from "../ejackpot-prize-data.json";

enum EjackpotPrizeCategories {
  FivePlusTwo = "5+2 oikein",
  FivePlusOne = "5+1 oikein",
  Five = "5 oikein",
  FourPlusTwo = "4+2 oikein",
  FourPlusOne = "4+1 oikein",
  Four = "4 oikein",
  ThreePlusTwo = "3+2 oikein",
  ThreePlusOne = "3+1 oikein",
  Three = "3 oikein",
  TwoPlusTwo = "2+2 oikein",
  TwoPlusOne = "2+1 oikein",
  OnePlusTwo = "1+2 oikein",
}

export const selectEurojackpotNumbers = (): GeneratedNumbers => {
  return {
    numbers: selectNumbersFromRange(40, 5),
    starNumbers: selectNumbersFromRange(10, 2),
  }
}


export const checkEurojackpotResult = (playerNumbers: EjpNumbers, generatedNumbers: EjpNumbers): EjpResult => {

  let correctNumbers: number[] = [];
  let correctStarNumbers: number[] = [];

  playerNumbers.numbers.forEach((number) => {
    if (generatedNumbers.numbers.includes(number)) correctNumbers = [...correctNumbers, number];
  })
  
  playerNumbers.starNumbers.forEach((number) => {
    if (generatedNumbers.starNumbers.includes(number)) correctStarNumbers = [...correctStarNumbers, number]
  })

  return {
    correctNumbers: correctNumbers,
    correctStarNumbers: correctStarNumbers,
    winAmount: calculateEjpWin(correctNumbers, correctStarNumbers),
  }
}

const getRandomFromArray = (arrayKey: EjackpotPrizeCategories) => {
  const array = prizeData[arrayKey];
  return array[Math.floor(Math.random() * array.length)];
}

export const calculateEjpWin = (correctNumbers: number[], correctStarNumbers: number[]): number => {
  const correctNumbersAmount = correctNumbers.length;
  const correctStarNumbersAmount = correctStarNumbers.length;
  const result = `${correctNumbersAmount}+${correctStarNumbersAmount}`

  if (result === "2+1") return getRandomFromArray(EjackpotPrizeCategories.TwoPlusOne);
  if (result === "1+2") return getRandomFromArray(EjackpotPrizeCategories.OnePlusTwo);
  if (result === "3+0") return getRandomFromArray(EjackpotPrizeCategories.Three);
  if (result === "3+1") return getRandomFromArray(EjackpotPrizeCategories.ThreePlusOne);
  if (result === "2+2") return getRandomFromArray(EjackpotPrizeCategories.TwoPlusTwo);
  if (result === "4+0") return getRandomFromArray(EjackpotPrizeCategories.Four);
  if (result === "3+2") return getRandomFromArray(EjackpotPrizeCategories.ThreePlusTwo);
  if (result === "4+1") return getRandomFromArray(EjackpotPrizeCategories.FourPlusOne);
  if (result === "4+2") return getRandomFromArray(EjackpotPrizeCategories.FourPlusTwo);
  if (result === "5+0") return getRandomFromArray(EjackpotPrizeCategories.Five);
  if (result === "5+1") return getRandomFromArray(EjackpotPrizeCategories.FivePlusOne);
  if (result === "5+2") return getRandomFromArray(EjackpotPrizeCategories.FivePlusTwo);

  return 0;
  
}
