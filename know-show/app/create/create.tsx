import { useState } from "react";
import { PuzzleTextEntry } from "./puzzleTextEntry";
import { encodeLink, LinkDisplay } from "./linkDisplay";
import { ButtonInterface } from "./buttonInterface";
import { COMPONENT_DELIMITER } from "~/constants";
import { PuzzlePhrase } from "~/util/PuzzlePhrase";

export const ROWS_FOR_TEXT_AREA = 4;
export const DEFAULT_PUZZLE_ANSWER = 'Puzzle Answer';
export const DEFAULT_PUZZLE_PROMPT = 'Put puzzle here and click words below to #hide# #words#';


declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

export function Create() {
  const [puzzleAnswer, setPuzzleAnswer] = useState(DEFAULT_PUZZLE_ANSWER);
  const [puzzlePhrase, setPuzzlePhrase] = useState(PuzzlePhrase.fromFormattedPromptString(DEFAULT_PUZZLE_PROMPT));

  //TODO convert puzzle phrase to formatted puzzle prompt, and use that as puzzlePrompt
  const puzzlePrompt = puzzlePhrase.toFormattedPromptString();
  const answerAndPromptString = puzzleAnswer + COMPONENT_DELIMITER + puzzlePrompt;
  const encodedLinkString = encodeLink(answerAndPromptString)

  console.log("Encoded link string is " + encodedLinkString);
  return (
    <div className="mainLayout">
      <PuzzleTextEntry
        puzzleAnswerLabel="Enter Puzzle Answer"
        puzzleAnswer={puzzleAnswer}
        savePuzzleAnswer={setPuzzleAnswer}
        puzzlePromptLabel = "Enter Puzzle Text"
        puzzlePhrase = {puzzlePhrase}
        savePuzzlePhrase = {setPuzzlePhrase}
      />
      <br />
      <ButtonInterface 
        puzzlePhrase={puzzlePhrase}
        savePuzzlePhrase = {setPuzzlePhrase}
      />
      <br />
      <LinkDisplay
        labelText="A link to this puzzle is"
        linkText={encodedLinkString}
      />
    </div>
  );
}


