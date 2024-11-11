import React from "react";
import Image from "next/image";
import EUTIcon from "@/assets/icons/eut.png";

function Earnings() {
  return (
    <div className="font-figtree flex cursor-pointer items-center gap-2 text-xs">
      <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary">
        <Image src={EUTIcon} alt="EUT" />
      </div>
      0.75345
    </div>
  );
}

export default Earnings;
