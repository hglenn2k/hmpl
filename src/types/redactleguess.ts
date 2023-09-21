import { RedactleSong } from "./song";

export type RedactleGuessType = {
  song: RedactleSong | undefined;
  skipped: boolean;
  isCorrect: boolean | undefined;
};
