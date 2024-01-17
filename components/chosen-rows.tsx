import { AonNumbers } from "@/types/aon-types";
import { Games } from "@/types/enum";
import {
  LottoNumbers,
  PlayerRows,
  isAonNumbers,
  isLottoNumbers,
} from "@/types/lotto-types";
import { BsPCircle, BsTrash3Fill } from "react-icons/bs";
import { LuClover } from "react-icons/lu";
import AonRow from "./aon-row";
import LottoRow from "./lotto-row";

interface ChosenRowsProps {
  rows: PlayerRows;
  handleClickDelete: (index: number) => void;
}

const ChosenRows = (props: ChosenRowsProps) => {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <h2 className="text-center text-lg">Valitut rivit</h2>
      {props.rows.length > 0 ? (
        <div className="flex w-full flex-col items-center justify-center">
          {props.rows.map((row, index) => (
            <div
              key={index}
              className="mt-2 flex w-full flex-row items-center justify-between gap-1 rounded-xl border p-2 text-center"
            >
              {isAonNumbers(row) && <AonRow row={row} />}
              {isLottoNumbers(row) && <LottoRow row={row} />}

              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                {isAonNumbers(row) && row.luckyClover && (
                  <div className="flex flex-row items-center gap-1">
                    <LuClover className="text-xl" />
                    {row.luckyClover}
                  </div>
                )}
                {isLottoNumbers(row) && row.plusNumber && (
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div>
                      <BsPCircle className="h-6 w-6 rounded-full text-purple-500" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 p-1 sm:h-10 sm:w-10">
                      {row.plusNumber}
                    </div>
                  </div>
                )}
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white sm:h-10 sm:w-10"
                  onClick={() => props.handleClickDelete(index)}
                  data-testid="delete"
                >
                  <BsTrash3Fill className="h-4 w-4 text-slate-100" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Valitse vähintään yksi rivi.</p>
      )}
    </div>
  );
};

export default ChosenRows;
