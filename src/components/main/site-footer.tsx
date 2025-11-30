import React from "react";
import { siteConfig } from "@/configs/site";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const SiteFooter = () => {
  return (
    <footer aria-label="Footer" className="w-full">
      <div className="container w-full max-w-6xl py-10">
        <p className="text-xs text-foreground/60 sm:text-sm">
          @ 2023-{new Date().getFullYear()} MafShows.
        </p>
      </div>
      {/* <div className="container flex flex-col items-center justify-between md:h-24 md:flex-row md:py-0 gap-4"> */}
      <div className="container flex h-24 items-center gap-2 px-8">
        <Icons.play className="hidden h-6 w-6 md:block" />
        <p className="text-center text-xs leading-loose sm:text-sm md:text-left">
          Built by MafShows.
        </p>
      </div>
      {/* </div> */}
    </footer>
  );
};

export default SiteFooter;
