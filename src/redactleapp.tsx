import { event } from "react-ga";

import React from "react";
import _ from "lodash";

import { Verse, RedactleSong } from "./types/song";
import { GuessType } from "./types/guess";

import { todaysRedactleSolution } from "./helpers/todaysRedactleSolution";
import { getVerse } from "./helpers/redactleSolution";

import { Footer } from "./components";
import { RedactleInfoPopUp } from "./components/RedactleInfoPopUp";
import { Redactle } from "./components/Redactle";
import { ReHeader } from "./components/ReHeader";

import { Search } from "./components/Search";

import { Button } from "./components/Button";

import * as Styled from "./redactleapp.styled";

function RedactleApp() {
  const initialGuess = {
    song: undefined,
    skipped: false,
    isCorrect: undefined,
  } as GuessType;

  const [guesses, setGuesses] = React.useState<GuessType[]>([]);
  const [currentTry, setCurrentTry] = React.useState<number>(0);
  const [selectedSong, setSelectedSong] = React.useState<RedactleSong>();
  const [didGuess, setDidGuess] = React.useState<boolean>(false);
  const [currentSolution, setCurrentSolution] = React.useState<
    [Verse, RedactleSong]
  >(todaysRedactleSolution);

  const firstRun = localStorage.getItem("firstRun") === null;
  let stats = JSON.parse(localStorage.getItem("stats") || "{}");

  React.useEffect(() => {
    if (Array.isArray(stats)) {
      const visitedToday = _.isEqual(
        currentSolution[0].verse,
        stats[stats.length - 1].solution
      );

      if (!visitedToday) {
        stats.push({
          solution: todaysRedactleSolution,
          currentTry: 0,
          didGuess: 0,
        });
      } else {
        const { currentTry, guesses, didGuess } = stats[stats.length - 1];
        setCurrentTry(currentTry);
        setGuesses(guesses);
        setDidGuess(didGuess);
      }
    } else {
      // initialize stats
      // useEffect below does rest
      stats = [];
      stats.push({
        solution: currentSolution,
      });
    }
  }, []);

  React.useEffect(() => {
    if (Array.isArray(stats)) {
      stats[stats.length - 1].currentTry = currentTry;
      stats[stats.length - 1].didGuess = didGuess;
      stats[stats.length - 1].guesses = guesses;
    }
  }),
    [guesses, currentTry, didGuess];

  React.useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  const [isInfoPopUpOpen, setIsInfoPopUpOpen] =
    React.useState<boolean>(firstRun);

  const openInfoPopUp = React.useCallback(() => {
    setIsInfoPopUpOpen(true);
  }, []);

  const closeInfoPopUp = React.useCallback(() => {
    if (firstRun) {
      localStorage.setItem("firstRun", "false");
      setIsInfoPopUpOpen(false);
    } else {
      setIsInfoPopUpOpen(false);
    }
  }, [localStorage.getItem("firstRun")]);

  const skip = React.useCallback(() => {
    setGuesses([
      ...guesses,
      {
        song: undefined,
        skipped: true,
        isCorrect: undefined,
      },
    ]);

    setCurrentTry((prevTry) => prevTry + 1);

    event({
      category: "Game",
      action: "Skip",
    });
  }, [guesses]);

  const guess = React.useCallback(() => {
    const isCorrect = _.isEqual(selectedSong, currentSolution[1]);

    if (!selectedSong) {
      alert("You gotta pick a song tbh");
      return;
    }

    setGuesses([
      ...guesses,
      {
        song: selectedSong,
        skipped: false,
        isCorrect: isCorrect,
      },
    ]);

    setCurrentTry((prevTry) => prevTry + 1);

    setSelectedSong(undefined);

    if (isCorrect) {
      setDidGuess(true);
    }

    event({
      category: "Game",
      action: "Guess",
      label: `${selectedSong.artist} - ${selectedSong.name}`,
      value: isCorrect ? 1 : 0,
    });
  }, [guesses, selectedSong]);

  /* TODO: Implement after determining what your result component will look like

  // Whenever the game ends, you can pick another random song:
  React.useEffect(() => {
    if (didGuess || currentTry === 5) {
      setCurrentSolution(getVerse());
      // Also reset other game states, if necessary
      setGuesses(Array.from({ length: 5 }).fill(initialGuess) as GuessType[]);
      setCurrentTry(0);
      // ... and so on ...
    }
  }, [didGuess, currentTry]);

  */

  return (
    <main>
      <ReHeader openInfoPopUp={openInfoPopUp} />
      {isInfoPopUpOpen && <RedactleInfoPopUp onClose={closeInfoPopUp} />}
      <Styled.Container>
        <Redactle
          guesses={guesses}
          todaysSolution={currentSolution}
          currentTry={currentTry}
          didGuess={didGuess}
          setSelectedSong={setSelectedSong}
          skip={skip}
          guess={guess}
        />
      </Styled.Container>
      <p>Guess count: {currentTry}</p>
      <Footer />
    </main>
  );
}

export default RedactleApp;
