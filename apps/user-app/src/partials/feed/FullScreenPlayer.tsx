"use client";
import React, { useState, useEffect, useRef } from "react";
import { getBackgroundColor, type RGB } from "@/lib/colors";
import { songs, Song } from "@/data/songs";
import PlayerControls from "@/partials/feed/PlayerControls";

const DEFAULT_BACKGROUND_FALLBACK_COLOR = "#181818";

const FullScreenPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    DEFAULT_BACKGROUND_FALLBACK_COLOR
  );
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const song = songs[currentSongIndex];

  useEffect(() => {
    const audioInstance = new Audio(song.url);
    setAudio(audioInstance);

    return () => {
      audioInstance.pause();
      audioInstance.src = "";
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (isPlaying && audio) {
      audio.play();
    }
  }, [audio]);

  const resolveBackgroundColor = () => {
    if (imageRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const image = imageRef.current;
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, image.width, image.height);
        const imageData = ctx.getImageData(
          0,
          0,
          image.width,
          image.height
        ).data;

        const rgbColor: RGB = getBackgroundColor(
          imageData,
          image.width,
          image.height
        );
        setBackgroundColor(`rgb(${rgbColor.join(",")})`);
      } else {
        setBackgroundColor(DEFAULT_BACKGROUND_FALLBACK_COLOR);
      }
    }
  };

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      resolveBackgroundColor();
    }
  }, [song.albumArt]);

  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  function playNext() {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  }

  function playPrevious() {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true);
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen text-white transition-all duration-300 ease-in-out cursor-pointer"
      onClick={togglePlayPause}
      style={{ background: backgroundColor }}
    >
      <div className="px-10 py-6 flex flex-col justify-between h-full">
        <div>
          <div className="font-bold">Playing on Euterpe</div>
        </div>
        <div className="flex flex-col gap-32">
          <div className="flex items-end gap-4">
            {song.albumArt && (
              <img
                ref={imageRef}
                src={song.albumArt}
                alt="Album Art"
                onLoad={resolveBackgroundColor}
                className="w-32 max-w-xs rounded-lg shadow-lg"
                crossOrigin="anonymous"
              />
            )}
            <div>
              <h2 className="text-3xl bold">{song.title}</h2>
              <p className="text-sm font-semibold opacity-90">{song.artist}</p>
            </div>
          </div>
          <PlayerControls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            playPrevious={playPrevious}
            playNext={playNext}
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
