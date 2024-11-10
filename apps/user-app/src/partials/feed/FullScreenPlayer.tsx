"use client";
import React, { useState, useEffect, useRef } from "react";
import { getBackgroundColor, type RGB } from "@/lib/colors";
import { songs, Song } from "@/data/songs";
import PlayerControls from "@/partials/feed/PlayerControls";
import NextSongButton from "@/components/NextSongButton";

const DEFAULT_BACKGROUND_FALLBACK_COLOR = "#181818";

const FullScreenPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    DEFAULT_BACKGROUND_FALLBACK_COLOR,
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
          image.height,
        ).data;

        const rgbColor: RGB = getBackgroundColor(
          imageData,
          image.width,
          image.height,
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
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length,
    );
    setIsPlaying(true);
  }

  return (
    <div
      className="flex h-full w-full flex-col text-white transition-all duration-300 ease-in-out"
      style={{ background: backgroundColor }}
    >
      <div className="mr-6 mt-[18px] flex justify-end">
        <NextSongButton playNext={playNext} />
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-6">
          {song.albumArt && (
            <img
              ref={imageRef}
              src={song.albumArt}
              alt="Album Art"
              onLoad={resolveBackgroundColor}
              className="h-[360px] w-[360px] max-w-xs rounded-[16px] shadow-lg"
              crossOrigin="anonymous"
            />
          )}
          <div className="font-inter flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold tracking-[0.04em]">
              {song.title}
            </h2>
            <p className="text-base font-medium tracking-[0.04em] text-[#BDBDBD]">
              {song.artist}
            </p>
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
  );
};

export default FullScreenPlayer;
