import React from "react";

import { Song } from "../../types/song";
import { GuessType } from "../../types/guess";
import { scoreToEmoji } from "../../helpers";

import { Button } from "..";
import { YouTube } from "../YouTube";

import * as Styled from "./index.styled";

interface RedactleResultProps {
  didGuess: boolean;
  todaysSolution: Song;
  guesses: GuessType[];
  currentTry: number;
  lyricAttempts: number;
}

export function RedactleResult({
  didGuess,
  todaysSolution,
  guesses,
  currentTry,
  lyricAttempts,
}: RedactleResultProps) {
  const hoursToNextDay = Math.floor(
    (new Date(new Date().setHours(24, 0, 0, 0)).getTime() -
      new Date().getTime()) /
      1000 /
      60 /
      60
  );

  const textForTry = [
    "Wow!",
    "Im impressed.",
    "Not bad.",
    "Phew.",
    "That was close...",
  ];

  const triesConjugation = currentTry === 1 ? "guess" : "guesses";
  const lyricConjugation = lyricAttempts === 1 ? "check" : "checks";

  return (
    <>
      <Styled.ResultTitle>{textForTry[currentTry - 1]}</Styled.ResultTitle>
      <Styled.SongTitle>
        <p>Today&apos;s song is &apos;{todaysSolution.name}&apos;.</p>
      </Styled.SongTitle>
      <Styled.Tries>
        You got it right in {currentTry} {triesConjugation} with {lyricAttempts}{" "}
        lyric {lyricConjugation}.
      </Styled.Tries>
      <YouTube id={todaysSolution.youtubeId} />
      <Styled.TimeToNext>
        Try again tomorrow - new song in {hoursToNextDay} hours!
      </Styled.TimeToNext>
      {didGuess ? (
        <Button onClick={() => (window.location.href = "/bey")}>
          While You Wait...
        </Button>
      ) : (
        <Button
          variant="pink"
          style={{ color: "#ffff00", marginTop: 20 }}
          onClick={() => (window.location.href = "/bey")}
        >
          While You Wait...
        </Button>
      )}
    </>
  );
}
