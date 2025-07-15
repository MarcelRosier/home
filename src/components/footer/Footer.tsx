"use client";

import moment from "moment";

import { SiGithub, SiLinkedin, SiGooglescholar } from "react-icons/si";

export function Footer() {
  return (
    <div className="mb-12 mt-16 w-full 2xl:mt-24">
      <hr />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
        <div className="flex items-center gap-x-2">
          <a
            href={"https://github.com/MarcelRosier"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <SiGithub />
          </a>
          <a
            href={"https://www.linkedin.com/in/marcel-rosier-464940187/"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <SiLinkedin />
          </a>
          <a
            href={
              "https://scholar.google.com/citations?hl=de&user=Tggzt-UAAAAJ"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <SiGooglescholar />
          </a>
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm 2xl:text-base">
          &copy; Marcel Rosier {moment().format("YYYY")}
        </p>
      </div>
    </div>
  );
}
