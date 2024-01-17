import {
  GeneratedNumbers,
  PlayerNumbers,
  LottoResult,
  LottoNumbers,
} from "@/types/lotto-types";
import prizeData from "../prizeData.json";

enum PrizeCategories {
  Seven = "7 oikein",
  SixPlusOne = "6+1 oikein",
  Six = "6 oikein",
  Five = "5 oikein",
}

const numbers = Array.from({ length: 40 }, (_, index) => index + 1);

export const selectLotteryNumbers = (): GeneratedNumbers => {
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const selectedNumbers = numbers.slice(0, 7);
  const extraNumber = numbers[7];

  const plusNumber = Math.floor(Math.random() * 30) + 1;

  return {
    numbers: selectedNumbers.sort((a, b) => a - b),
    extraNumber: extraNumber,
    plusNumber: plusNumber,
  };
};

export const selectPlusNumber = () => {
  return Math.floor(Math.random() * 30) + 1;
};

export const checkLottoResult = (
  playerRow: LottoNumbers,
  lotteryNumbers: LottoNumbers,
): LottoResult => {
  let correctNumbers: number[] = [];

  playerRow.numbers.forEach((number, index) => {
    if (lotteryNumbers.numbers.includes(number))
      correctNumbers = [...correctNumbers, number];
  });

  let extraCorrect: boolean = playerRow.numbers.includes(
    lotteryNumbers.extraNumber!,
  );
  const plusCorrect: boolean =
    playerRow.plusNumber == lotteryNumbers.plusNumber;

  return {
    correctNumbers: correctNumbers,
    extraCorrect: extraCorrect,
    plusCorrect: plusCorrect,
    winAmount: calculateWinAmount(correctNumbers, extraCorrect, plusCorrect),
  };
};

const getRandomFromArray = (arrayKey: PrizeCategories) => {
  const array = prizeData[arrayKey];
  return array[Math.floor(Math.random() * array.length)];
};

export const calculateWinAmount = (
  correctNumbers: number[],
  extraCorrect: boolean,
  plusCorrect: boolean,
): number => {
  let win = 0;
  if (correctNumbers.length === 7)
    return getRandomFromArray(PrizeCategories.Seven);
  if (correctNumbers.length === 6 && extraCorrect)
    win = getRandomFromArray(PrizeCategories.SixPlusOne);
  if (correctNumbers.length === 6)
    win = getRandomFromArray(PrizeCategories.Six);
  if (correctNumbers.length === 5)
    win = getRandomFromArray(PrizeCategories.Five);
  if (correctNumbers.length === 4) win = 10;
  if (correctNumbers.length === 3 && extraCorrect) win = 2;

  if (plusCorrect && correctNumbers.length === 1) return 5;
  if (plusCorrect && correctNumbers.length !== 7) return win * 5;

  return win;
};
