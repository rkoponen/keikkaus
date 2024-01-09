import { Highscore } from "@/types/highscore";
import clientPromise from "./mongodb";
import { cache } from "react";
import { Games } from "@/types/games-enum";

export const getScores = cache(async (game: Games) => {
  const client = await clientPromise;
  const db = client.db("keikkaus");

  const scores = await db
    .collection<Highscore>("highscores")
    .find({ game: game })
    .sort({ score: -1 })
    .limit(100)
    .toArray();
  return scores;
});
