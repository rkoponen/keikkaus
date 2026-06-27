//TODO: simulation
//
//
import { AonNumbers, EjpNumbers, LottoNumbers } from "@/types/lotto-types";
import { ButtonTooltip } from "./button-tooltip"
import { Button } from "./ui/button";
interface SimulationButtonProps {
  handleClickSimulation: () => void;
  startSimulation: boolean;
  rows: AonNumbers[] | LottoNumbers[] | EjpNumbers[]; 
}

export const SimulationButton = ({handleClickSimulation, startSimulation, rows}: SimulationButtonProps) => {

  return (<ButtonTooltip
          button={
            <Button
              className="mt-4 w-full"
              onClick={handleClickSimulation}
              disabled={rows.length === 0}
            >
              {startSimulation === true
                ? `Lopeta simulaatio`
                : "Aloita simulaatio"}
            </Button>
          }
          text={"Valitse vähintään yksi rivi."}
          hidden={rows.length === 0}
        />)
}
