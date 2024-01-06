import { Highscore } from "@/types/highscore";
import clientPromise from "./mongodb";
import { cache } from "react";

export const getScores = cache(async () => {
  const client = await clientPromise;
  const db = client.db("keikkaus");

  const scores = await db
    .collection<Highscore>("highscores")
    .find({ game: "lotto" })
    .sort({ score: 1 })
    .limit(100)
    .toArray();
  return scores;
});
