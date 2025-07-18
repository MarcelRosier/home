import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";

import {
  SiGithub,
  SiLinkedin,
  SiGooglescholar,
  SiInstagram,
} from "react-icons/si";

type IconLinkProps = {
  href: string;
  icon: any;
  label: string;
};

function IconLink({ href, icon: Icon, label }: IconLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-115 transition-transform"
        >
          <Icon className="w-4 h-4" />
        </a>
      </TooltipTrigger>
      <TooltipContent className="text-sm rounded px-2 py-1 shadow-md">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function Footer() {
  return (
    <TooltipProvider>
      <div className="mb-12 mt-16 w-full 2xl:mt-24">
        <hr />
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-x-4">
            <IconLink
              href="https://github.com/MarcelRosier"
              icon={SiGithub}
              label="GitHub Profile"
            />
            <IconLink
              href="www.linkedin.com/in/marcel-rosier"
              icon={SiLinkedin}
              label="LinkedIn Profile"
            />
            <IconLink
              href="https://scholar.google.com/citations?hl=de&user=Tggzt-UAAAAJ"
              icon={SiGooglescholar}
              label="Google Scholar Profile"
            />
            <p>|</p>
            <IconLink
              href="https://www.instagram.com/marcel.stills/"
              icon={SiInstagram}
              label="Instagram Photography Profile"
            />
          </div>

          <p className="text-xs text-muted-foreground sm:text-sm 2xl:text-base">
            &copy; Marcel Rosier {moment().format("YYYY")}
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
