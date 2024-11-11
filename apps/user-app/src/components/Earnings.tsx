"use client";

import React from "react";
import { EUTIcon } from "@/components/Icons";
import { useEarningsStore } from "@/providers/store/earnings.store";

function Earnings() {
  const earnings = useEarningsStore((state) => state.earnings);
  return (
    <div className="flex cursor-pointer items-center gap-2 font-figtree text-xs">
      <EUTIcon className="h-5 w-5" />
      <span>{earnings.toFixed(2)}</span> EUT
    </div>
  );
}

export default Earnings;
