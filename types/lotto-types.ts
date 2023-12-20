export type PlayerNumbers = {
  numbers: number[];
  plusNumber?: number;
};

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
export type BestResult = {
  result: Result;
  index: number;
};
