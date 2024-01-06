import clientPromise from "@/lib/mongodb";
import { Highscore } from "@/types/highscore";

interface ScoresListProps {
  scores: Highscore[];
}

const Scoreslist = ({ scores }: ScoresListProps) => {
  return (
    <div>
      <h1 className="text-lg">Top scores</h1>
      <ul>
        {scores.map((score) => (
          <li key={score.id?.toString()}>
            <p>
              {score.nickname} {score.score}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreslist;
