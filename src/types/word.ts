export interface Word {
    text: string;
    currentState: "notRedacted" | "noGuess" | "failedGuess" | "successfulGuess" | "newLine";
}  
  