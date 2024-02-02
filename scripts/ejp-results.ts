import * as fs from "fs/promises";
import GameResults from "./lotto-results.ts";
import { PrizeTier } from "./lotto-results.ts";



const fetchEurojacpotResultsAndWriteToFile = async () => {
  const baseurl = "https://www.veikkaus.fi/api/draw-results/v1/games/EJACKPOT/draws-by-week/";
  
  const results = new Map();
  const prizeData: Record<string, number[]> = {};

}
