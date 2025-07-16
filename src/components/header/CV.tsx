import * as React from "react";
import { FileText } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function CV() {
  const baseUrl = import.meta.env.BASE_URL; // will be "/home/" or "/" at runtime
  const cvUrl = `${baseUrl}/cv.pdf`;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={cvUrl} target="_blank" rel="noopener noreferrer">
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
