import { ThemeToggle } from "@/components/header/ThemeToggle";
import useScroll from "@/hooks/use-scroll";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { CV } from "@/components/header/CV";
import { Logo } from "@/components/header/logo";

export function Header() {
  const { scrollPosition } = useScroll();

  return (
    <TooltipProvider>
      <div
        className={`fixed left-0 right-0 top-0 z-40 flex items-center backdrop-blur-md transition-all duration-300 ${
          scrollPosition > 35
            ? "border-b-0.5 h-[70px] 2xl:h-[100px]"
            : "h-[120px] border-none 2xl:h-[160px]"
        } border-b`}
      >
        <div className="container z-50 mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-2 ">
            <CV />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
