export type AonNumbers = {
  numbers: number[];
  luckyClover?: number;
};

export type AonResult = {
  correctNumbers: number[];
  cloverCorrect: boolean;
  winAmount: number;
};

export type BestAonResult = {
  result: AonResult;
  index: number;
};