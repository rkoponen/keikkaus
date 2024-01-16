import React from "react";

import LottoGame from "@/components/lotto-game";
import Scoreslist from "@/components/scores-list";
import { Games } from "@/types/enum";

let lottoNumbers = Array.from({ length: 40 }, (_, index) => {
  return index + 1;
});

const LottoPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="flex flex-row justify-between">
        <div className="mx-6 hidden w-96 xl:block"></div>
        <div>
          <LottoGame />
        </div>
        <div className="mx-6 hidden w-96 xl:block">
          <Scoreslist game={Games.Lotto} />
        </div>
      </div>
    </main>
  );
};

export default LottoPage;
