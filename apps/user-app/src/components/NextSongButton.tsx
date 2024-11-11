import React from "react";
import { Button } from "@/components/ui/button";

function NextSongButton({ playNext }: { playNext: () => void }) {
  return (
    <Button
      variant={"secondary"}
      className="font-figtree inline-flex hover:bg-[#1B1B1B]/80 gap-1 rounded-lg bg-[#1B1B1B] px-3 py-2 text-primary"
      onClick={playNext}
    >
      Next song{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2.50781 4.81305V11.1931C2.50781 12.4997 3.92781 13.3197 5.06115 12.6664L7.8278 11.0731L10.5945 9.47307C11.7278 8.81973 11.7278 7.1864 10.5945 6.53305L7.8278 4.93305L5.06115 3.33971C3.92781 2.68638 2.50781 3.49971 2.50781 4.81305Z"
          fill="#C1FF70"
        />
        <path
          d="M13.4922 12.6202C13.2189 12.6202 12.9922 12.3935 12.9922 12.1202V3.88019C12.9922 3.60685 13.2189 3.38019 13.4922 3.38019C13.7655 3.38019 13.9922 3.60685 13.9922 3.88019V12.1202C13.9922 12.3935 13.7722 12.6202 13.4922 12.6202Z"
          fill="#C1FF70"
        />
      </svg>
    </Button>
  );
}

export default NextSongButton;
