import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { SiArxiv, SiGithub } from "react-icons/si";
import { FaRegFileImage } from "react-icons/fa";

// import { FC } from "react";

type Link = {
  url: string;
  label: string;
  icon: string;
};

type Props = {
  links: Link[];
};

const getIcon = (icon: string) => {
  switch (icon) {
    case "arxiv":
      return <SiArxiv />;
    case "github":
      return <SiGithub />;
    case "poster":
      return <FaRegFileImage />;
    default:
      return null;
  }
};

const LinkList = ({ links }) => {
  return (
    <TooltipProvider>
      <div className="flex flex-row space-x-2">
        {links.map((link) => (
          <Tooltip key={link.url}>
            <TooltipTrigger asChild>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition-transform"
              >
                {getIcon(link.icon)}
              </a>
            </TooltipTrigger>
            <TooltipContent className="text-sm rounded px-2 py-1 shadow-md">
              {link.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default LinkList;
