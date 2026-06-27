//TODO: Test ejp-utils!

import { EjpNumbers, EjpResult, GeneratedNumbers, isEjpNumbers } from "@/types/lotto-types";
import { calculateEjpWin, checkEurojackpotResult, selectEurojackpotNumbers } from "./ejp-utils";

// Eliminate randomness
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;
// selectEurojackpotNumbers returns [1, 2, 3, 26, 34] and [1, 10] now.


describe("selectEurojacpotNumbers", () => {
  test("should return an object with 5 numbers and 2 star numbers", () => {
    const result: GeneratedNumbers = selectEurojackpotNumbers();
    expect(isEjpNumbers(result)).toBeTruthy();
    if (isEjpNumbers(result)) {
      console.log(result.numbers);
      console.log(result.starNumbers);
      expect(result.numbers).toEqual(result.numbers.sort((a,b) => a - b));
      expect(result.starNumbers).toEqual(result.starNumbers.sort((a, b) => a - b))
    }
  });
});

describe("checkEurojackpotResult", () => {
  test("should return the correct win amount", () => {
    const playerNumbers = selectEurojackpotNumbers() as EjpNumbers;
    const generatedNumbers = selectEurojackpotNumbers() as EjpNumbers;
    const result = checkEurojackpotResult(playerNumbers, generatedNumbers);

    expect(result.correctNumbers).toHaveLength(5);
    expect(result.correctStarNumbers).toHaveLength(2);

    expect(result.winAmount).toEqual(34889569);
  })
  test("should return correct amount of correct numbers", () => {
    const playerNumbers: EjpNumbers = {
      numbers: [1, 2, 3, 32, 36],
      starNumbers: [1, 5],
    }
    const generatedNumbers = selectEurojackpotNumbers() as EjpNumbers;

    const result = checkEurojackpotResult(playerNumbers, generatedNumbers);
    expect(result.correctNumbers).toHaveLength(3);
    expect(result.correctStarNumbers).toHaveLength(1);

  })
})

describe("calculateEjpWin", () => {
  describe("should return 0", () => {
    test("when 0+0 correct", () => {
      const winAmount = calculateEjpWin([], []);
      expect(winAmount).toEqual(0);
    });
    test("when 1+1 correct", () => {
      const winAmount = calculateEjpWin([1], [1]);
      expect(winAmount).toEqual(0);
    });
    test("when 2+0 correct", () => {
      const winAmount = calculateEjpWin([1, 2], []);
      expect(winAmount).toEqual(0);
    })
  });
  test("should return > 0 when 2+1 correct", () => {
    const winAmount = calculateEjpWin([2, 2], [1]);
    expect(winAmount).toBeGreaterThan(0);
  })
})
