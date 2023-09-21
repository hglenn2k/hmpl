export interface BaseSong {
  artist: string;
  name: string;
  youtubeId: string;
}

export interface Verse {
  performer: string;
  verse: string;
}

export interface Song extends BaseSong {
}

export interface RedactleSong extends BaseSong {
  album: string;
  verses: Verse[];
}
