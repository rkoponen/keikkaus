import { Result, selectLotteryNumbers, checkLottoResult } from "./lotto-utils";
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

    const result: Result = checkLottoResult(playerRow, lotteryResult);

    expect(result.correctNumbers).toEqual(playerRow);
    expect(result.extraCorrect).toBeFalsy();
  });

  test("should return empty correctNumbers when no matches", () => {
    const playerRow = [1, 2, 3, 4, 5, 6, 7];
    const lotteryResult: LotteryResult = {
      numbers: [8, 9, 10, 11, 12, 13, 14],
      extraNumber: 24,
    };

    const result: Result = checkLottoResult(playerRow, lotteryResult);

    expect(result.correctNumbers).toEqual([]);
    expect(result.extraCorrect).toBeFalsy();
  });

  // test("should return extraNumber true if there are 3 or 6 correctNumbers", () => {
  //   const playerRow = [1, 2, 3, 4, 5, 6, 7];
  //   const lotteryResult: LotteryResult = {
  //     numbers: [1, 2, 3, 11, 12, 13, 14],
  //     extraNumber: 6,
  //   };

  //   const result: Result = checkResult(playerRow, lotteryResult);

  //   expect(result.correctNumbers).toHaveLength(3);
  //   expect(result.extraCorrect).toBeTruthy();

  //   const secondRow = [1, 2, 3, 4, 5, 6, 7];
  //   const secondLotteryResult: LotteryResult = {
  //     numbers: [1, 2, 3, 4, 5, 6],
  //     extraNumber: 7,
  //   };
  //   const secondResult = checkResult(secondRow, secondLotteryResult);

  //   expect(secondResult.correctNumbers).toHaveLength(6);
  //   expect(result.extraCorrect).toBeTruthy();
  // });

  // test("should return extraNumber false when other amount of correctNumbers than 3 or 6", () => {
  //   const playerRow = [1, 2, 3, 4, 5, 6, 7];
  //   const lotteryResult: LotteryResult = {
  //     numbers: [8, 9, 10, 11, 12, 13, 14],
  //     extraNumber: 6,
  //   };

  //   const result: Result = checkResult(playerRow, lotteryResult);

  //   expect(result.correctNumbers).toHaveLength(0);
  //   expect(result.extraCorrect).toBeFalsy();
  // });

  test("should return the correct amount of correct numbers", () => {
    const playerRow = [1, 2, 3, 4, 5, 6, 7];
    const lotteryResult: LotteryResult = {
      numbers: [5, 6, 7, 9, 12, 13, 14],
      extraNumber: 1,
    };
    const result: Result = checkLottoResult(playerRow, lotteryResult);

    expect(result.correctNumbers).toHaveLength(3);
  });
});
