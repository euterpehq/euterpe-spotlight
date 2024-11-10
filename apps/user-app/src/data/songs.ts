export type Song = {
  title: string;
  artist: string;
  albumArt: string;
  url: string;
};

export const songs: Song[] = [
  {
    title: "Song One",
    artist: "Artist A",
    albumArt:
      "https://ia801604.us.archive.org/28/items/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd-829521842.jpg",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/1cAC6GdLhQxx2qaUOHGs9uGp2Fhx28UBk3f4G5dJ.mp3",
  },
  {
    title: "Song Two",
    artist: "Artist B",
    albumArt:
      "https://cdn.pixabay.com/audio/2024/10/17/15-53-19-182_200x200.jpg",
    url: "https://cdn.pixabay.com/audio/2024/10/17/audio_5743a1bac5.mp3",
  },
];
