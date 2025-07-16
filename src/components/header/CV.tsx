import * as React from "react";
import { FileText } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";

export function CV() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
          <Button size="icon" variant="ghost">
            <FileText />
          </Button>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p className="flex items-center gap-x-1 text-sm">Checkout my CV</p>
      </TooltipContent>
    </Tooltip>
  );
}
