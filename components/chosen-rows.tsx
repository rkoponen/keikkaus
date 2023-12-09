import { BsTrash3Fill } from "react-icons/bs";

interface ChosenRowsProps {
  rows: number[][];
  handleClickDelete: (index: number) => void;
}

const ChosenRows = (props: ChosenRowsProps) => {
  return (
    <div className="text-center w-full">
      <h2 className="text-lg text-center">Valitut rivit</h2>
      {props.rows.length > 0 ? (
        <div className="flex flex-row flex-wrap">
          {props.rows.map((row, index) => (
            <div
              key={index}
              className="flex flex-row gap-1 mt-2 p-2 border rounded-xl justify-between items-center text-center w-full"
            >
              <div className="grid grid-cols-6 grid-rows-2 gap-2 space-between sm:grid-cols-12 sm:grid-rows-1 w-9/12 sm:w-10/12 sm:mr-2">
                {row.map((number, innerIndex) => (
                  <div
                    key={innerIndex}
                    className="flex items-center justify-center border rounded-full p-1 w-8 h-8 sm:w-10 sm:h-10 text-sm"
                    data-testid="selected-number"
                  >
                    {number}
                  </div>
                ))}
              </div>

              <button
                className="flex grow sm:grow bg-red-500 text-white h-8 sm:h-10 rounded-full justify-center items-center"
                onClick={() => props.handleClickDelete(index)}
                data-testid="delete"
              >
                <BsTrash3Fill className="h-4 w-4 text-slate-100" />
              </button>
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
