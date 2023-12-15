export const sortNumbers = (numbers: number[], newNumber: number) => {
  return [...numbers, newNumber].sort((a, b) => a - b);
};

export const selectNumbersFromRange = (maxNumber: number, amount: number) => {
  const numbers = Array.from({ length: maxNumber }, (_, index) => index + 1);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const selectedNumbers = numbers.slice(0, amount);

  return selectedNumbers.sort((a, b) => a - b);
};
