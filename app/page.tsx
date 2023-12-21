import Image from "next/image";
import Link from "next/link";
import lotto from "../public/lotto.svg";
import aon from "../public/aon.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-2 sm:p-12 font-mono">
      <div>
        <h1 className="text-xl font-bold tracking-widest mb-10">Pelit</h1>
      </div>
      <div className="flex flex-col items-center justify-center sm:grid sm:grid-cols-2 sm:w-max gap-4 sm:gap-10">
        <div>
          <Link href="/lotto">
            <div className="sm:w-72 px-2">
              <label htmlFor="lotto" className="text-sm italic">
                Lotto
              </label>
              <div
                id="lotto"
                className="border p-6 rounded-lg border-black bg-emerald-200 hover:cursor-pointer hover:scale-105 hover:shadow-lg transition ease-in-out delay-50"
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
                className="p-6 bg-amber-200 border rounded-lg border-black hover:cursor-pointer hover:scale-105 hover:shadow-lg transition ease-in-out delay-50"
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
