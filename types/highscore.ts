import { ObjectId } from "mongodb";

export type Highscore = {
  nickname: string;
  score: number;
  game: string;
  id?: ObjectId;
};

