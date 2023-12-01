import { PlayerNumbers } from "../lotto/page";

export type LotteryResult = {
  numbers: number[];
  extraNumber: number;
  plusNumber: number;
};

export type Result = {
  correctNumbers: number[];
  extraCorrect: boolean;
  plusCorrect?: boolean;
  winAmount: number;
};

const numbers = Array.from({ length: 40 }, (_, index) => index + 1);

export const selectLotteryNumbers = (): LotteryResult => {
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const selectedNumbers = numbers.slice(0, 7);
  // console.log(selectedNumbers.sort((a, b) => a - b));
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

export const checkResult = (
  playerRow: PlayerNumbers,
  lotteryResult: LotteryResult
): Result => {
  let correctNumbers: number[] = [];

  playerRow.numbers.forEach((number, index) => {
    if (lotteryResult.numbers.includes(number))
      correctNumbers = [...correctNumbers, number];
  });
  // console.log("---------------------------------");
  // console.log(`correct ${correctNumbers}`);
  // console.log(`player ${playerRow}`);
  // console.log(`arvottu ${lotteryResult.numbers}`);
  // console.log("---------------------------------");

  let extraCorrect: boolean = playerRow.numbers.includes(
    lotteryResult.extraNumber
  );
  const plusCorrect: boolean = playerRow.plusNumber == lotteryResult.plusNumber;

  return {
    correctNumbers: correctNumbers,
    extraCorrect: extraCorrect,
    plusCorrect: plusCorrect,
    winAmount: calculateWinAmount(correctNumbers, extraCorrect, plusCorrect),
  };
};

interface WinningCategory {
  checkWin: (correctNumbers: number[], extraCorrect: boolean) => boolean;
  prize: number;
}

const winningCategories: WinningCategory[] = [
  {
    checkWin: (correctNumbers: number[], extraCorrect: boolean) =>
      correctNumbers.length === 7,
    prize: 7000000,
  },
  {
    checkWin: (correctNumbers: number[], extraCorrect: boolean) =>
      correctNumbers.length === 6 && extraCorrect,
    prize: 140000,
  },
  {
    checkWin: (correctNumbers: number[], extraCorrect: boolean) =>
      correctNumbers.length === 6,
    prize: 3000,
  },
  {
    checkWin: (correctNumbers: number[], extraCorrect: boolean) =>
      correctNumbers.length === 5,
    prize: 50,
  },
  {
    checkWin: (correctNumbers: number[], extraCorrect: boolean) =>
      correctNumbers.length === 4,
    prize: 10,
  },
  {
    checkWin: (correctNumbers: number[], extraCorrect: boolean) =>
      correctNumbers.length === 3 && extraCorrect,
    prize: 2,
  },
];

export const calculateWinAmount = (
  correctNumbers: number[],
  extraCorrect: boolean,
  plusCorrect: boolean
): number => {
  const matchingCategory = winningCategories.find((category) =>
    category.checkWin(correctNumbers, extraCorrect)
  );

  if (plusCorrect && correctNumbers.length <= 3 && !extraCorrect) return 5;

  if (plusCorrect && correctNumbers.length != 7) {
    return matchingCategory ? matchingCategory.prize * 5 : 0;
  } else {
    return matchingCategory ? matchingCategory.prize : 0;
  }
};
