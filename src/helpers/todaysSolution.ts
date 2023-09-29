import { songs } from "../constants";

// Use 1 for February instead of 2.
const epochMs = new Date(2022, 1, 21).valueOf();
const now = Date.now();
const msInDay = 86400000;
const index = Math.floor((now - epochMs) / msInDay);

// Use Math.abs to ensure the index is non-negative.
export const todaysSolution = songs[(Math.abs(index) * 59 + 2) % songs.length];
