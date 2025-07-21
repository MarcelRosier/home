import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Logo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={"/cv.pdf"} target="_blank" rel="noopener noreferrer">
          <p className="text-xl tracking-[-.22em]">MR</p>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p className="flex items-center gap-x-1 text-sm">Back home</p>
      </TooltipContent>
    </Tooltip>
  );
}
