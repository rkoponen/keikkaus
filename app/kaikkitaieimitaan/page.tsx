import Scoreslist from "@/components/highscores";
import { Games } from "@/types/games-enum";
import AonOptions from "@/components/aon-options";

const AoNPage = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-2">
      <div className="z-10 flex w-full flex-col items-center justify-center font-mono text-sm">
        {/* "flex flex-col-reverse gap-6 lg:flex-row lg:justify-between" */}
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="w-96 mx-6"></div>
          <div className="">
            <AonOptions />
          </div>
          <div className="w-96 mx-6">
            <Scoreslist game={Games.AllOrNothing} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AoNPage;
