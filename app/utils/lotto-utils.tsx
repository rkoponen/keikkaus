export type LotteryResult = {
  numbers: number[];
  extraNumber: number;
};

export type Result = {
  correctNumbers: number[];
  extraCorrect: boolean;
};

const numbers = Array.from({ length: 40 }, (_, index) => index + 1);

export const selectLotteryNumbers = (): LotteryResult => {

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const selectedNumbers = numbers.slice(0, 7);
  console.log(selectedNumbers.sort((a, b) => a - b));
  const extraNumber = numbers[7];

  return {
    numbers: selectedNumbers.sort((a, b) => a - b),
    extraNumber: extraNumber,
  };
};

export const checkResult = (
  playerRow: number[],
  lotteryResult: LotteryResult
): Result => {
  let correctNumbers: number[] = [];

  playerRow.forEach((number, index) => {
    if (lotteryResult.numbers.includes(number))
      correctNumbers = [...correctNumbers, number];
  });
  // console.log("---------------------------------");
  // console.log(`correct ${correctNumbers}`);
  // console.log(`player ${playerRow}`);
  // console.log(`arvottu ${lotteryResult.numbers}`);
  // console.log("---------------------------------");

  let extraCorrect: boolean = playerRow.includes(lotteryResult.extraNumber);

  return {
    correctNumbers: correctNumbers,
    extraCorrect: extraCorrect,
  };
};
