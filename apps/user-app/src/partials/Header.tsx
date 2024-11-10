import React from "react";
import ConnectButton from "@/components/ConnectButton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[3.25rem] items-center justify-between bg-white/[0.02] px-6 py-3 shadow-[0px_0.5px_0px_0px_#313131]">
      <div className="flex">
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/">
            <h2 className="text-sm font-bold">Euterpe</h2>
          </Link>
          <Badge
            variant="outline"
            className="text-nowrap font-azeret text-[0.563rem]"
          >
            Pre-Alpha
          </Badge>
        </div>
        {/* <button
          className="text-muted-foreground lg:hidden"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="5" width="16" height="2" />
            <rect x="4" y="11" width="16" height="2" />
            <rect x="4" y="17" width="16" height="2" />
          </svg>
        </button> */}
      </div>

      <div className="flex items-center space-x-4">
        <ConnectButton align="right" />
      </div>
    </header>
  );
}

export default Header;
