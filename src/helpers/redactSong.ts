// redactSong.ts

import { Word } from "../types/word";

function redactionAlgorithm(word: string): Word["currentState"] {
  return word.length > 3 ? "noGuess" : "notRedacted";
}

export function transformToWords(lyrics: string): Word[] {
  const regex = /(\n|[a-zA-Z]+(?='s)|'s|[\w.]+|\s+|[.,;?!](?!\w))/g;
  const matches = lyrics.match(regex) || [];

  let isEven = false; // add this line

  return matches.map((wordOrDelimiter) => {
    if (wordOrDelimiter === "\n") {
      return {
        text: "",
        currentState: "newLine",
      };
    } else if (/\s+/.test(wordOrDelimiter)) {
      return {
        text: " ",
        currentState: "notRedacted",
      };
    } else if (wordOrDelimiter === "'s") {
      return {
        text: "'s",
        currentState: "notRedacted",
      };
    } else if (
      wordOrDelimiter.length === 1 &&
      /[.,;?!]/.test(wordOrDelimiter)
    ) {
      return {
        text: wordOrDelimiter,
        currentState: "notRedacted",
      };
    } else {
      // Check if the word has 4 characters
      if (wordOrDelimiter.length === 4) {
        // Toggle isEven
        isEven = !isEven;

        // Only redact if isEven is true
        return {
          text: wordOrDelimiter,
          currentState: isEven
            ? redactionAlgorithm(wordOrDelimiter)
            : "notRedacted",
        };
      }

      return {
        text: wordOrDelimiter,
        currentState: redactionAlgorithm(wordOrDelimiter),
      };
    }
  });
}

export function checkGuesses(
  originalWords: Word[],
  userGuesses: string[],
): Word[] {
  return originalWords.map((word, index) => {
    if (
      word.currentState === "successfulGuess" ||
      (word.currentState !== "noGuess" && word.currentState !== "failedGuess")
    ) {
      return word;
    }

    const userGuess = userGuesses[index];

    if (!userGuess) {
      return word;
    }

    if (word.text.toLowerCase() === userGuess.toLowerCase()) {
      return {
        ...word,
        currentState: "successfulGuess",
      };
    } else {
      return {
        ...word,
        currentState: "failedGuess",
      };
    }
  });
}

export default {
  transformToWords,
};
