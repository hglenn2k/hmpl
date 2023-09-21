import { verses } from "../constants/verses";
import { RedactleSong, Verse } from "../types/song";

const epochMs = new Date(2022, 2, 21).valueOf();
const now = Date.now();
const msInDay = 86400000;
const songIndex = Math.floor((now - epochMs) / msInDay);

const selectedSong = verses[songIndex % verses.length];
const verseIndex = songIndex % selectedSong.verses.length;
const selectedVerse: Verse = selectedSong.verses[verseIndex];

export const todaysRedactleSolution: [Verse, RedactleSong] = [
  selectedVerse,
  selectedSong,
];
