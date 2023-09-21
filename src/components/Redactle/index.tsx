import React from "react";

import { GuessType } from "../../types/guess";
import { Verse, RedactleSong } from "../../types/song";

import { Button, Guess, Result, Search } from "..";

import * as Styled from "./index.styled";

interface Props {
  guesses: GuessType[];
  todaysSolution: [Verse, RedactleSong];
  currentTry: number;
  didGuess: boolean;
  setSelectedSong: React.Dispatch<
    React.SetStateAction<RedactleSong | undefined>
  >;
  skip: () => void;
  guess: () => void;
}

export function Redactle({
  guesses,
  todaysSolution,
  currentTry,
  didGuess,
  setSelectedSong,
  skip,
  guess,
}: Props) {
  if (didGuess || currentTry === 5) {
    return (
      <Result
        didGuess={didGuess}
        currentTry={currentTry}
        todaysSolution={todaysSolution[1]}
        guesses={guesses}
      />
    );
  }

  return (
    <>
      <Styled.LyricsPlaceholder>
        {todaysSolution[0]?.verse &&
          todaysSolution[0].verse.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </Styled.LyricsPlaceholder>

      <Search<RedactleSong>
        currentTry={currentTry}
        setSelectedSong={setSelectedSong}
        source="verses"
      />

      <Styled.Buttons>
        <Button onClick={skip}>Guess Lyrics</Button>
        <Button variant="green" onClick={guess}>
          Guess Song
        </Button>
      </Styled.Buttons>
    </>
  );
}
