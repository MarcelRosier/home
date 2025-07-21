import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Logo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={() => (window.location.href = "/")}>
          <p className="text-xl tracking-[-.22em]">MR</p>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="flex items-center gap-x-1 text-sm">Back home</p>
      </TooltipContent>
    </Tooltip>
  );
}
