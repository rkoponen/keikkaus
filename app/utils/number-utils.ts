export const sortNumbers = (numbers: number[], newNumber: number) => {
  return [...numbers, newNumber].sort((a, b) => a - b);
};
