import React from "react";

import LottoGame from "@/components/lotto-game";
import Scoreslist from "@/components/highscores";
import { Games } from "@/types/games-enum";

let lottoNumbers = Array.from({ length: 40 }, (_, index) => {
  return index + 1;
});

const LottoPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="flex flex-row justify-between">
        <div className="w-96 mx-6"></div>
        <div>
          <LottoGame />
        </div>
        <div className="w-96 mx-6">
          <Scoreslist game={Games.Lotto} />
        </div>
      </div>
    </main>
  );
};

export default LottoPage;
