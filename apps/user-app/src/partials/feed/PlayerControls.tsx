import React from "react";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  currentTime: number;
  duration: number;
  handleSeek: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function PlayerControls({
  isPlaying,
  togglePlayPause,
  playNext,
  playPrevious,
  currentTime,
  duration,
  handleSeek,
}: PlayerControlsProps) {
  return (
    <div
      className="flex flex-col items-center gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={togglePlayPause}>
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 6.5C2 4.61438 2 3.67157 2.58579 3.08579C3.17157 2.5 4.11438 2.5 6 2.5C7.88562 2.5 8.82843 2.5 9.41421 3.08579C10 3.67157 10 4.61438 10 6.5V18.5C10 20.3856 10 21.3284 9.41421 21.9142C8.82843 22.5 7.88562 22.5 6 22.5C4.11438 22.5 3.17157 22.5 2.58579 21.9142C2 21.3284 2 20.3856 2 18.5V6.5Z"
              fill="#C1FF70"
            />
            <path
              d="M14 6.5C14 4.61438 14 3.67157 14.5858 3.08579C15.1716 2.5 16.1144 2.5 18 2.5C19.8856 2.5 20.8284 2.5 21.4142 3.08579C22 3.67157 22 4.61438 22 6.5V18.5C22 20.3856 22 21.3284 21.4142 21.9142C20.8284 22.5 19.8856 22.5 18 22.5C16.1144 22.5 15.1716 22.5 14.5858 21.9142C14 21.3284 14 20.3856 14 18.5V6.5Z"
              fill="#C1FF70"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#C1FF70"
            fill="#C1FF70"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
            />
          </svg>
        )}
      </button>

      <div className="flex items-center gap-2.5 font-inter text-xs text-[#BDBDBD]">
        <span className="w-[20px]">{formatTime(currentTime)}</span>
        <div className="cursor-pointer py-1.5" onClick={handleSeek}>
          <div className="relative h-[2px] w-[339px] max-w-xs rounded-[24px] bg-primary/10 md:max-w-[339px]">
            <div
              className="h-full rounded-[24px] bg-primary"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        <span className="w-[20px]">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export default PlayerControls;
