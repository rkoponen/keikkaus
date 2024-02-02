
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



export type LottoNumbers = {
  numbers: number[];
  extraNumber?: number;
  plusNumber?: number;
};

// export const isLottoNumbers = (val: PlayerNumbers): val is LottoNumbers => {
//   return (
//     typeof val === "object" &&
//     val !== null &&
//     Array.isArray(val.numbers) &&
//     typeof val.numbers.plusNumber === undefined ||
//   )
// }

export type PlayerNumbers = LottoNumbers | AonNumbers;

export type PlayerRows = LottoNumbers[] | AonNumbers[];

export type GeneratedNumbers = AonNumbers | LottoNumbers;

export const isAonNumbers = (
  numbers: AonNumbers | LottoNumbers,
): numbers is AonNumbers => {
  return numbers.numbers.length === 12;
};

export const isLottoNumbers = (
  numbers: AonNumbers | LottoNumbers,
): numbers is LottoNumbers => {
  return numbers.numbers.length === 7;
};

export type LottoResult = {
  correctNumbers: number[];
  extraCorrect: boolean;
  plusCorrect?: boolean;
  winAmount: number;
};

export type BestResult = {
  result: LottoResult | AonResult;
  index: number;
};

export type PlayerResult = {
  result?: LottoResult | AonResult;
  moneyUsed?: number;
};

export const isPlayerResult = (
  result: PlayerResult | undefined,
): result is PlayerResult => {
  return result?.result !== undefined && result !== undefined;
};

export const isLottoResult = (
  result: LottoResult | AonResult,
): result is LottoResult => {
  return result.correctNumbers.length === 7;
};

export function isAonResult(
  result: LottoResult | AonResult,
): result is AonResult {
  return (
    (result as AonResult).cloverCorrect !== undefined &&
    typeof (result as AonResult).cloverCorrect === "boolean" &&
    Array.isArray((result as AonResult).correctNumbers)
  );
}
