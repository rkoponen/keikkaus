import Image from "next/image";
import Link from "next/link";
import lotto from "../public/lotto.svg";
import aon from "../public/aon.svg";
import { getScores } from "@/lib/db-utils";
import { Games } from "@/types/games-enum";

export default async function Home() {
  const scores = await getScores(Games.AllOrNothing);

  return (
    <main className="flex min-h-screen flex-col items-center p-2 font-mono sm:p-12">
      <div>
        <h1 className="mb-2 text-xl font-bold tracking-widest">Pelit</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 sm:grid sm:w-max sm:grid-cols-2 sm:gap-10">
        <div>
          <Link href="/lotto">
            <div className="px-2 sm:w-72">
              <label htmlFor="lotto" className="text-sm italic">
                Lotto
              </label>
              <div
                id="lotto"
                className="delay-50 rounded-lg border border-black bg-emerald-200 p-6 transition ease-in-out hover:cursor-pointer hover:shadow-lg md:hover:scale-105"
              >
                <Image src={lotto} alt="lotto" />
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/kaikkitaieimitaan">
            <div className="px-2 sm:w-72">
              <label htmlFor="aon" className="text-sm italic">
                Kaikki tai ei mitään
              </label>
              <div
                id="aon"
                className="delay-50 rounded-lg border border-black bg-amber-200 p-6 transition ease-in-out hover:cursor-pointer hover:shadow-lg md:hover:scale-105"
              >
                <Image src={aon} alt="all or nothing" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
