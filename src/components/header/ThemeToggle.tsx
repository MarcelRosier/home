import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  const invert = React.useCallback((theme: string | undefined) => {
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "light";
      default:
        return "dark";
    }
  }, []);

  React.useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme(invert(theme));
  }, [setTheme, invert, theme]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleTheme]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={toggleTheme} variant={"ghost"}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="flex items-center gap-x-1 text-sm">
          {capitalize(invert(theme))} Mode
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-accent px-1.5 font-mono text-[10px] font-medium text-accent-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
