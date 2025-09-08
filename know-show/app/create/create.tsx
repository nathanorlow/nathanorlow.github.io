import { useState } from "react";
import { CreateInterface } from "./createInterface";
import { encodeLink, LinkDisplay } from "./linkDisplay";
import { ButtonInterface } from "./buttonInterface";
import { COMPONENT_DELIMITER } from "~/constants";
import { PuzzlePhrase } from "~/util/PuzzlePhrase";
import { ModeInterface } from "./mode/ModeInterface";
import { Mode } from "./mode/ModeButton";
import { useParams } from "react-router";
import { getPuzzleComponentsFromString } from "~/solve/solve";

export const ROWS_FOR_TEXT_AREA = 4;
export const DEFAULT_PUZZLE_ANSWER = 'Puzzle Answer';
export const DEFAULT_PUZZLE_PROMPT = 'Put puzzle here and click words below to #hide# #words#';


declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

export function Create() {
  const {encodedString} = useParams();
  const {initialPuzzleAnswer, initialPuzzlePrompt} = getPuzzleComponentsFromString(encodedString);
  const [puzzleAnswer, setPuzzleAnswer] = useState(initialPuzzleAnswer ?? DEFAULT_PUZZLE_ANSWER);
  const initialPuzzlePhrase = PuzzlePhrase.fromFormattedPromptString(initialPuzzlePrompt ?? DEFAULT_PUZZLE_PROMPT);
  const [puzzlePhrase, setPuzzlePhrase] = useState(initialPuzzlePhrase);
  const [currentMode, setCurrentMode] = useState(Mode.None);

  const puzzlePrompt = puzzlePhrase.toFormattedPromptString();
  const answerAndPromptString = puzzleAnswer + COMPONENT_DELIMITER + puzzlePrompt;
  const encodedLinkString = encodeLink(answerAndPromptString)
  const solveLink = "/solve/" + encodedLinkString

  const createLayoutClassName : "createLayout blockedMode" | "createLayout noneMode" =
    (currentMode == Mode.Blocked) ?
    "createLayout blockedMode" :
    "createLayout noneMode";

  return (
    <div className={createLayoutClassName}>
      <CreateInterface
        puzzleAnswerLabel="Enter Puzzle Answer"
        puzzleAnswer={puzzleAnswer}
        savePuzzleAnswer={setPuzzleAnswer}
        puzzlePromptLabel = "Enter Puzzle Text"
        puzzlePhrase = {puzzlePhrase}
        savePuzzlePhrase = {setPuzzlePhrase}
      />
      <br />
      <ModeInterface
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
      <br />
      <ButtonInterface 
        puzzlePhrase={puzzlePhrase}
        savePuzzlePhrase = {setPuzzlePhrase}
        currentMode = {currentMode}
      />
      <br />
      <LinkDisplay
        buttonText="Click here to solve this prompt (can copy a link)"
        link={solveLink}
      />
    </div>
  );
}
