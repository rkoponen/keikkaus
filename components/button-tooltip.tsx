import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonTooltipProps {
  button: React.ReactElement;
  hidden: boolean;
  text: string;
}

export const ButtonTooltip = (props: ButtonTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>{props.button}</span>
        </TooltipTrigger>
        {props.hidden && (
          <TooltipContent>
            <p>{props.text}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
