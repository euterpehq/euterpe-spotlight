import React from "react";
import ConnectButton from "@/components/ConnectButton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Earnings from "@/components/Earnings";
import { Separator } from "@/components/ui/separator";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[3.25rem] items-center justify-between border-b-[0.2px] border-[#303033]/80 bg-white/[0.02] px-6 py-3">
      <div className="flex">
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/">
            <h2 className="text-sm font-bold">Euterpe</h2>
          </Link>
          <Badge
            variant="outline"
            className="font-azeret text-nowrap text-[0.563rem]"
          >
            Listen to Earn
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Earnings />
        <Separator orientation="vertical" className="h-4" />
        <ConnectButton align="right" />
      </div>
    </header>
  );
}

export default Header;
