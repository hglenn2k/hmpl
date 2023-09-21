import { songs } from "../constants";
import { verses } from "../constants/verses";
import { RedactleSong, Song } from "../types/song";

export function searchSong(
  searchTerm: string,
  source: "songs" | "verses" = "songs"
): (Song | RedactleSong)[] {
  searchTerm = searchTerm.toLowerCase();

  const database = source === "songs" ? songs : verses;

  return database
    .filter((entry: Song | RedactleSong) => {
      const name = entry.name.toLowerCase();
      const artist = entry.artist.toLowerCase();

      return artist.includes(searchTerm) || name.includes(searchTerm);
    })
    .sort((a, b) =>
      a.artist.toLowerCase().localeCompare(b.artist.toLowerCase())
    )
    .slice(0, 5);
}
