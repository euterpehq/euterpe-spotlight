import React from "react";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

function PlayerControls({
  isPlaying,
  togglePlayPause,
  playNext,
  playPrevious,
}: PlayerControlsProps) {
  return (
    <div
      className="flex gap-4 items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={playPrevious}>Previous</button>
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={playNext}>Next</button>
    </div>
  );
}

export default PlayerControls;
