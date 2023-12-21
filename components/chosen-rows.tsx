import { AonNumbers } from "@/types/aon-types";
import { BsTrash3Fill } from "react-icons/bs";
import { LuClover } from "react-icons/lu";

interface ChosenRowsProps {
  rows: AonNumbers[];
  handleClickDelete: (index: number) => void;
}

const ChosenRows = (props: ChosenRowsProps) => {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <h2 className="text-center text-lg">Valitut rivit</h2>
      {props.rows.length > 0 ? (
        <div className="flex w-full flex-row flex-wrap items-center justify-center sm:w-max">
          {props.rows.map((row, index) => (
            <div
              key={index}
              className="mt-2 flex w-full flex-row items-center justify-between gap-1 rounded-xl border p-2 text-center sm:w-max"
            >
              <div className="space-between grid w-full grid-cols-6 grid-rows-2 gap-2 sm:mr-2 sm:w-10/12 sm:grid-cols-12 sm:grid-rows-1">
                {row.numbers.map((number, innerIndex) => (
                  <div
                    key={innerIndex}
                    className="flex h-8 w-8 items-center justify-center rounded-full border p-1 text-sm sm:h-10 sm:w-10"
                    data-testid="selected-number"
                  >
                    {number}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                {row.luckyClover && (
                  <div className="flex flex-row items-center gap-1">
                    <LuClover className="text-xl" />
                    {row.luckyClover}
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
