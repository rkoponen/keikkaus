import * as fs from "fs/promises";
import { json } from "stream/consumers";

type Lotto = {
  id: number;
  prizeTiers: PrizeTier[];
};

type PrizeTier = {
  name: string;
  shareAmount: number;
  multiplier: boolean;
};

const fetchResultsAndWriteToFile = async () => {
  // const response = await fetch(
  //   "https://www.veikkaus.fi/api/draw-results/v1/games/LOTTO/draws/by-week/2023-W44"
  // );

  const baseUrl =
    "https://www.veikkaus.fi/api/draw-results/v1/games/LOTTO/draws/by-week/";
  // const result = await response.json();
  // console.log(result[0]);
  // const lotto: Lotto = result[0];
  const results = new Map();
  const prizeData: Record<string, number[]> = {};

  for (let i = 2017; i < new Date().getFullYear(); i++) {
    for (let j = 1; j < 52; j++) {
      const url = `${baseUrl}${i}-W${j < 10 ? `0${j}` : j}`;
      const response = await fetch(url);
      const result = await response.json();
      const lotto: Lotto = result[0];
      console.log(lotto.id);
      lotto.prizeTiers.forEach((tier) => {
        const name = tier.name;
        if (!prizeData[name]) {
          prizeData[name] = [];
        }
        if (tier.shareAmount > 0 && !tier.multiplier) {
          prizeData[name].push(tier.shareAmount / 100);
        }
      });
    }
  }
  console.log(prizeData);

  try {
    const jsonData = JSON.stringify(prizeData, null, 2);
    await fs.writeFile(process.cwd() + "/app/prizeData.json", jsonData);
  } catch (error) {
    console.error("Error writing prizeData.json:", error);
  }
};

fetchResultsAndWriteToFile();
