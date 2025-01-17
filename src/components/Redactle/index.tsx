import React, { useState } from "react";

import { GuessType } from "../../types/guess";
import { Verse, RedactleSong } from "../../types/song";

import { Button, Guess, Search } from "..";
import { RedactleResult } from "../RedactleResult";

import { Word } from "../../types/word";
import { transformToWords, checkGuesses } from "../../helpers/redactSong";

import * as Styled from "./index.styled";

interface Props {
  guesses: GuessType[];
  todaysSolution: [Verse, RedactleSong];
  currentTry: number;
  didGuess: boolean;
  selectedSong: RedactleSong | undefined;
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
  selectedSong,
  setSelectedSong,
  skip,
  guess,
}: Props) {
  const [lyricChecks, setLyricChecks] = useState<number>(0);
  const [songGuesses, setSongGuesses] = useState<number>(0);

  const wordsArrayInit = todaysSolution[0]?.verse
    ? transformToWords(todaysSolution[0].verse)
    : [];

  const [wordsArray, setWordsArray] = useState<Word[]>(wordsArrayInit);
  const [userGuesses, setUserGuesses] = useState<string[]>(
    new Array(wordsArray.length).fill(""),
  );

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const updatedGuesses = [...userGuesses];
    updatedGuesses[index] = event.target.value;
    setUserGuesses(updatedGuesses);

    if (
      event.target.value === "" &&
      wordsArray[index].currentState === "failedGuess"
    ) {
      const updatedWords = [...wordsArray];
      updatedWords[index].currentState = "noGuess";
      setWordsArray(updatedWords);
    }
  }

  function handleLyricCheck() {
    if (userGuesses.some((guess) => guess.trim() !== "")) {
      const updatedWords = checkGuesses(wordsArray, userGuesses);
      setLyricChecks((prevTries) => prevTries + 1);
      setWordsArray(updatedWords);
    }
  }

  function handleSongGuess() {
    if (selectedSong) {
      setSongGuesses((prevGuesses) => prevGuesses + 1);
      guess();
    } else {
      alert("You gotta pick a song tbh");
    }
  }

  if (didGuess) {
    return (
      <RedactleResult
        didGuess={didGuess}
        currentTry={currentTry}
        todaysSolution={todaysSolution[1]}
        guesses={guesses}
        lyricAttempts={lyricChecks}
      />
    );
  }

  return (
    <>
      <Styled.LyricsPlaceholder>
        {wordsArray.map((word, index) => {
          const nextElement = wordsArray[index + 1];

          // Determine if a space should be added after the current element
          const addSpace =
            word.text !== "'s" &&
            nextElement &&
            !/[.,;?!'s]/.test(nextElement.text);

          switch (word.currentState) {
            case "newLine":
              return <br key={index} />;
            case "noGuess":
              return (
                <input
                  key={index}
                  className={"noGuess"}
                  placeholder={word.text.length.toString()}
                  value={userGuesses[index] || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: `${word.text.length * 8}px` }}
                />
              );
            case "successfulGuess":
              return (
                <span key={index} className="successfulGuess">
                  {word.text}
                </span>
              );
            case "failedGuess":
              return (
                <input
                  key={index}
                  className={"wrongGuess"}
                  placeholder={word.text.length.toString()}
                  value={userGuesses[index] || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: `${word.text.length * 8}px` }}
                />
              );
            default:
              return <span key={index}>{word.text}</span>;
          }
        })}
      </Styled.LyricsPlaceholder>

      <Search<RedactleSong>
        currentTry={currentTry}
        setSelectedSong={setSelectedSong}
        source="verses"
      />

      <Styled.Buttons>
        <Button onClick={handleLyricCheck}>Guess Lyrics ({lyricChecks})</Button>
        <Button variant="green" onClick={handleSongGuess}>
          Guess Song ({songGuesses}){" "}
        </Button>
      </Styled.Buttons>
    </>
  );
}
