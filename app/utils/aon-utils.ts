import { selectNumbersFromRange } from "./number-utils";

const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

export const selectAonNumbers = () => {
  const selectedNumbers = selectNumbersFromRange(24, 12);

  const luckyClover = selectClover();

  return {
    numbers: selectedNumbers.sort((a, b) => a - b),
    luckyClover: luckyClover,
  };
};

export type AonNumbers = {
  numbers: number[];
  luckyClover?: number;
};

export type AonResult = {
  correctNumbers: number[];
  cloverCorrect: boolean;
  winAmount: number;
};

export const checkAonResult = (
  playerNumbers: AonNumbers,
  lotteryNumbers: AonNumbers,
  betSize: number
): AonResult => {
  let correctNumbers: number[] = [];

  playerNumbers.numbers.forEach((number, index) => {
    if (lotteryNumbers.numbers.includes(number))
      correctNumbers = [...correctNumbers, number];
  });

  const cloverCorrect =
    playerNumbers.luckyClover === lotteryNumbers.luckyClover;

  return {
    correctNumbers: correctNumbers,
    cloverCorrect: cloverCorrect,
    winAmount: calculateAonWinAmount(correctNumbers, cloverCorrect, betSize),
  };
};

export const selectClover = () => {
  return Math.floor(Math.random() * 4) + 1;
};

export const calculateAonWinAmount = (
  correctNumbers: number[],
  cloverCorrect: boolean,
  betSize: number
) => {
  switch (correctNumbers.length) {
    case 5:
    case 6:
    case 7:
      return cloverCorrect ? 1 * betSize : 0;
    case 4:
    case 8:
      return cloverCorrect ? 1 * 4 * betSize : 1 * betSize;
    case 3:
    case 9:
      return cloverCorrect ? 5 * 4 * betSize : 5 * betSize;
    case 2:
    case 10:
      return cloverCorrect ? 25 * 4 * betSize : 25 * betSize;
    case 1:
    case 11:
      return cloverCorrect ? 250 * 4 * betSize : 250 * betSize;
    case 0:
    case 12:
      return cloverCorrect ? 125000 * 4 * betSize : 125000 * betSize;

    default:
      return 0;
  }
};
