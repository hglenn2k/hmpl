import React from "react";

import { Song } from "../../types/song";
import { GuessType } from "../../types/guess";
import { scoreToEmoji } from "../../helpers";

import { Button } from "..";
import { YouTube } from "../YouTube";

import * as Styled from "./index.styled";

interface Props {
  didGuess: boolean;
  currentTry: number;
  todaysSolution: Song;
  guesses: GuessType[];
}

export function Result({
  didGuess,
  todaysSolution,
  guesses,
  currentTry,
}: Props) {
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

  if (didGuess) {
    const copyResult = React.useCallback(() => {
      navigator.clipboard.writeText(scoreToEmoji(guesses));
    }, [guesses]);

    const triesConjugation = currentTry === 1 ? "guess" : "guesses";

    return (
      <>
        <Styled.ResultTitle>{textForTry[currentTry - 1]}</Styled.ResultTitle>
        <Styled.SongTitle>
          <p>Today&apos;s song is &apos;{todaysSolution.name}&apos;.</p>
        </Styled.SongTitle>
        <Styled.Tries>
          You got it right in {currentTry} {triesConjugation}.
        </Styled.Tries>
        <YouTube id={todaysSolution.youtubeId} />
        <Styled.TimeToNext>
          Try again tomorrow - new song in {hoursToNextDay} hours!
        </Styled.TimeToNext>
        <Button onClick={() => (window.location.href = "/59")}>
          While You Wait...
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Styled.ResultTitle>You got stung 🐝</Styled.ResultTitle>
        <Styled.SongTitle>
          <p>Today&apos;s song is &apos;{todaysSolution.name}&apos;.</p>
        </Styled.SongTitle>
        <YouTube id={todaysSolution.youtubeId} />
        <Styled.TimeToNext>
          Try again tomorrow - new song in {hoursToNextDay} hours!
        </Styled.TimeToNext>
        <Button
          variant="pink"
          style={{ color: "#ffff00", marginTop: 20 }}
          onClick={() => (window.location.href = "/59")}
        >
          While You Wait...
        </Button>
      </>
    );
  }
}
