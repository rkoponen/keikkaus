import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 gap-10">
        <Link href="/lotto">
          <div>
            <label htmlFor="lotto" className="text-sm">
              Lotto
            </label>
            <div
              id="lotto"
              className="border p-6 rounded-lg border-black bg-emerald-200 hover:cursor-pointer hover:scale-105 hover:shadow-lg transition ease-in-out delay-50"
            >
              <Image src="/lotto.svg" width={150} height={150} alt="lotto" />
            </div>
          </div>
        </Link>
        <Link href="/kaikkitaieimitaan">
          <div>
            <label htmlFor="aon" className="text-sm">
              Kaikki tai ei mitään
            </label>
            <div
              id="aon"
              className="p-6 bg-amber-200 border rounded-lg border-black hover:cursor-pointer hover:scale-105 hover:shadow-lg transition ease-in-out delay-50"
            >
              <Image
                src="/aon.svg"
                width={150}
                height={150}
                alt="all or nothing"
              />
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
