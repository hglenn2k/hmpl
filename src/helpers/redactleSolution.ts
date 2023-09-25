import { verses } from "../constants/verses";
import { RedactleSong, Verse } from "../types/song";

export function getVerse(
  artist?: string,
  album?: string,
): [RedactleSong, number] {
  let filteredVerses = verses;

  if (artist) {
    filteredVerses = filteredVerses.filter(
      (song: RedactleSong) => song.artist === artist,
    );
  }

  if (album) {
    filteredVerses = filteredVerses.filter(
      (song: RedactleSong) => song.album === album,
    );
  }

  const chosenSong =
    filteredVerses[Math.floor(Math.random() * filteredVerses.length)];
  const verseIndex = Math.floor(Math.random() * chosenSong.verses.length);

  return [chosenSong, verseIndex];
}
