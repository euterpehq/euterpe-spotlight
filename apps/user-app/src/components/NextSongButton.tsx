import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextIcon from "@/assets/icons/next.svg";

function NextSongButton({ playNext }: { playNext: () => void }) {
  return (
    <Button
      variant={"secondary"}
      className="inline-flex gap-1 rounded-lg bg-[#1B1B1B] px-3 py-2"
      onClick={playNext}
    >
      Next song{" "}
      <Image src={NextIcon} alt="Next Song Icon" className="h-4 w-4" />
    </Button>
  );
}

export default NextSongButton;
