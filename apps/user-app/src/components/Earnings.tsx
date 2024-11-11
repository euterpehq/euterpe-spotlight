import React from "react";
import { EUTIcon } from "@/components//Icons";

function Earnings() {
  return (
    <div className="flex cursor-pointer items-center gap-2 font-figtree text-xs">
      <EUTIcon className="h-5 w-5" />
      0.75345
    </div>
  );
}

export default Earnings;
