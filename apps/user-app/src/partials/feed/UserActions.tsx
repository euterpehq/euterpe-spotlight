import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EUTIcon, EUTIconBlackBackground } from "@/components/Icons";

type UserActionsProps = {
  canClaimReward: boolean;
  claimAction: () => void;
  discoverArtistAction: () => void;
};

function UserActions({
  canClaimReward,
  claimAction,
  discoverArtistAction,
}: UserActionsProps) {
  return (
    <div className="flex gap-3">
      <ClaimButton disabled={!canClaimReward} onClick={claimAction} />
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
        "gap-1.5 rounded-[120px] px-2.5 py-2 font-figtree text-xs font-semibold tracking-[-0.04em] transition-none disabled:opacity-100",
        disabled
          ? "bg-white/20 text-[#757575]"
          : "bg-primary text-[#0F0F0F] transition-colors",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? (
        <EUTIcon className="h-4 w-4" />
      ) : (
        <EUTIconBlackBackground className="h-4 w-4" />
      )}
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
