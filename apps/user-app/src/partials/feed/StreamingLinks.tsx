import React from "react";
import { Button } from "@/components/ui/button";
import { type Song } from "@/data/songs";

function StreamingLinks({ song }: { song: Song }) {
  return (
    <div className="flex gap-3">
      {["Apple Music", "Spotify", "YouTube Music"].map((link, index) => (
        <Button
          key={index}
          className="rounded-[120px] bg-white px-4 py-2 font-figtree text-xs font-semibold tracking-[-0.02em] text-[#0F0F0F] hover:bg-white/90"
        >
          {link}
        </Button>
      ))}
    </div>
  );
}

export default StreamingLinks;
