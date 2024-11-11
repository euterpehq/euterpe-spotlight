import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import EUTIcon from "@/assets/icons/eut.png";
import { cn } from "@/lib/utils";
import { songs, Song } from "@/data/songs";

type UserActionsProps = {
  claimAction: () => void;
  discoverArtistAction: () => void;
};

function UserActions({ claimAction, discoverArtistAction }: UserActionsProps) {
  return (
    <div className="flex gap-3">
      <ClaimButton onClick={claimAction} />
      <DiscoverArtistButton onClick={discoverArtistAction} />
    </div>
  );
}

type ClaimButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

function ClaimButton({ onClick, disabled = true }: ClaimButtonProps) {
  return (
    <Button
      className={cn(
        "gap-1.5 rounded-[120px] px-2.5 py-2 font-figtree text-xs font-semibold tracking-[-0.04em]",
        disabled && "bg-white/20 text-[#757575] disabled:opacity-100",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {" "}
      <div className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary">
        <Image src={EUTIcon} alt="EUT" className="h-[7px] w-[7px]" />
      </div>
      <div className="inline-flex items-center gap-1">
        <span>Claim</span>
        <span>0.75345</span>
      </div>
    </Button>
  );
}

function DiscoverArtistButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-[120px] bg-white px-4 py-2 font-figtree text-xs font-semibold tracking-[-0.02em] text-[#0F0F0F] hover:bg-white/90"
      onClick={onClick}
    >
      Discover this artist
    </Button>
  );
}

export default UserActions;
