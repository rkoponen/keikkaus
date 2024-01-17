import { formatMoney } from "@/app/utils/number-utils";
import { getScores } from "@/lib/db-utils";
import { Games } from "@/types/enum";

interface ScoresListProps {
  game: Games;
}

const Scoreslist = async ({ game }: ScoresListProps) => {
  const scores = await getScores(game);

  return (
    <div className="flex w-96 flex-col items-center rounded-lg border p-2">
      <h1 className="mb-2 text-lg">Parhaat voitot</h1>
      <table className="w-96 border-collapse overflow-hidden rounded-lg border">
        <thead className="border-none bg-green-200">
          <tr key={1} className="border-none">
            <th className="px-4 py-2">Nimi</th>
            <th className="px-4 py-2">Voitto</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.id?.toString()} className="border">
              <td className="max-w-[96px] overflow-hidden px-4 py-2 text-center">
                {score.nickname}
              </td>
              <td className="px-4 py-2 text-center">
                {formatMoney(score.score)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreslist;
