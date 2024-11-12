import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Song } from "@/data/songs";

function StreamingLinks({ song }: { song: Song }) {
  const platforms = [
    { name: "Apple Music", url: song.apple },
    { name: "Spotify", url: song.spotify },
    { name: "YouTube Music", url: song.youtube },
  ];
  return (
    <div className="flex gap-3">
      {platforms.map((platform) => (
        <Button
          key={platform.name}
          className="rounded-[120px] bg-white px-4 py-2 font-figtree text-xs font-semibold tracking-[-0.02em] text-[#0F0F0F] hover:bg-white/90"
          asChild
        >
          <Link href={platform.url} target="_blank" rel="noopener noreferrer">
            {platform.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export default StreamingLinks;
