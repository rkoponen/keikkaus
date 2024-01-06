"use server";
import { Highscore } from "@/types/highscore";
import clientPromise from "./mongodb";

export const addScore = async (score: Highscore) => {
  const client = await clientPromise;
  const db = client.db("keikkaus");

  await db.collection<Highscore>("highscores").insertOne(score);
};
