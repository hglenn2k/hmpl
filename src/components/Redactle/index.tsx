import React from "react";

import { GuessType } from "../../types/guess";
import { Song } from "../../types/song";

import { Button, Guess, Result, Search } from "..";

import * as Styled from "./index.styled";

interface Props {
  guesses: GuessType[];
  todaysSolution: Song;
  currentTry: number;
  didGuess: boolean;
  setSelectedSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
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
    // Change the 6 to 5
    return (
      <Result
        didGuess={didGuess}
        currentTry={currentTry}
        todaysSolution={todaysSolution}
        guesses={guesses}
      />
    );
  }

  return (
    <>
      <Styled.LyricsPlaceholder>
        {/* This will be a component or div where you'll display the redacted lyrics for the user */}
      </Styled.LyricsPlaceholder>

      {guesses.map((guess: GuessType, index) => (
        <Guess
          key={index}
          guess={guess}
          isCorrect={guess.isCorrect}
          active={index === currentTry}
        />
      ))}

      <Search currentTry={currentTry} setSelectedSong={setSelectedSong} />

      <Styled.Buttons>
        <Button onClick={skip}>Skip Guess</Button>
        <Button variant="green" onClick={guess}>
          Guess
        </Button>
      </Styled.Buttons>
    </>
  );
}
