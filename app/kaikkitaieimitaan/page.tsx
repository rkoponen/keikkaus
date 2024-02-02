import Scoreslist from "@/components/scores-list";
import { Games } from "@/types/enum";
import AonOptions from "@/components/aon-options";
import React from "react";

export const dynamic = "force-dynamic";

const AoNPage = () => {
  return (
    // <main className="flex min-h-screen w-screen  flex-col items-center justify-between p-2">
    //   <div className="relative z-10 flex w-full flex-col items-center justify-center font-mono text-sm">
    //     <div className="static">
    //       <div className="w-full">
    //         <AonOptions />
    //       </div>
    //       <div className="right-0 top-0 m-6 hidden lg:absolute xl:block">
    //         <Scoreslist game={Games.AllOrNothing} />
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <main className="relative flex min-h-screen flex-col items-center justify-between p-2">
      <div className="z-10 flex w-full flex-col items-center justify-center font-mono text-sm">
        {/* "flex flex-col-reverse gap-6 lg:flex-row lg:justify-between" */}
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mx-6 hidden w-96 xl:block"></div>
          <div className="">
            <AonOptions />
          </div>
          <div className="mx-6 hidden w-96 xl:block">
            <Scoreslist game={Games.AllOrNothing} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AoNPage;
