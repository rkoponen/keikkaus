import { Result, selectLotteryNumbers, checkResult } from "./lotto-utils";
import { LotteryResult } from "./lotto-utils";

describe("selectLotteryNumbers", () => {
  test("should return an object with sorted numbers and an extra number", () => {
    const result: LotteryResult = selectLotteryNumbers();
    expect(result.numbers).toEqual(result.numbers.sort((a, b) => a - b));
    expect(result.extraNumber).toBeGreaterThanOrEqual(1);
    expect(result.extraNumber).toBeLessThanOrEqual(40);
  });
});

describe("checkResult", () => {
  test("should return correct numbers and extraCorrect = false", () => {
    const playerRow = [1, 2, 3, 4, 5, 6, 7];
    const lotteryResult: LotteryResult = {
      numbers: [1, 2, 3, 4, 5, 6, 7],
      extraNumber: 8,
    };

    const result: Result = checkResult(playerRow, lotteryResult);

    expect(result.correctNumbers).toEqual(playerRow);
    expect(result.extraCorrect).toBeFalsy();
  });

  test("should return empty correctNumbers when no matches", () => {
    const playerRow = [1, 2, 3, 4, 5, 6, 7];
    const lotteryResult: LotteryResult = {
      numbers: [8, 9, 10, 11, 12, 13, 14],
      extraNumber: 1,
    };

    const result: Result = checkResult(playerRow, lotteryResult);

    expect(result.correctNumbers).toEqual([]);
    expect(result.extraCorrect).toBeTruthy();
  });

  test("should return the correct amount of correct numbers", () => {
    const playerRow = [1, 2, 3, 4, 5, 6, 7];
    const lotteryResult: LotteryResult = {
      numbers: [5, 6, 7, 9, 12, 13, 14],
      extraNumber: 1,
    };
    const result: Result = checkResult(playerRow, lotteryResult);

    expect(result.correctNumbers).toHaveLength(3)
  });
});
