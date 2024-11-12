"use client";

import React, { useState } from "react";
import { EUTIcon } from "@/components/Icons";
import { useEarningsStore } from "@/providers/store/earnings.store";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import WithdrawButton from "@/components/WithdrawButton";

function Earnings() {
  const earnings = useEarningsStore((state) => state.earnings);
  const [opendialog, setOpendialog] = useState(false);

  return (
    <Dialog open={opendialog} onOpenChange={setOpendialog}>
      <DialogTrigger>
        <div className="flex cursor-pointer items-center gap-2 font-figtree text-xs font-semibold tracking-[-0.02em]">
          <EUTIcon className="h-5 w-5" />
          <span>{earnings.toFixed(2)}</span> EUT
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-5 bg-[#1A1A1A] p-6">
        <DialogHeader className="">
          <DialogTitle className="mb-2 text-xl font-semibold tracking-tight">
            Withdraw Rewards
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2 rounded-md bg-[#2B2B2B] p-5 shadow-sm">
          <div className="text-2xl font-semibold text-white">
            {earnings.toFixed(2)} EUT
          </div>
          <p className="text-xs font-medium text-[#A0A0A0]">Current Balance</p>
        </div>

        <div className="mt-3 w-full text-center text-sm leading-relaxed text-muted-foreground">
          Withdraw your rewards directly to your wallet and enjoy the benefits
          of supporting fresh, underground artists!
        </div>

        <WithdrawButton onSuccess={() => setOpendialog(false)} />

        <p className="mt-3 text-[0.688rem] font-semibold tracking-[-0.04em] text-muted-foreground">
          *Please ensure you have linked a valid wallet before withdrawing.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default Earnings;
