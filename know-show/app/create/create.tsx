import { useState } from "react";
import { PuzzleTextEntry } from "./puzzleTextEntry";
import { LinkDisplay } from "./linkDisplay";
import { PuzzleInterface } from "./puzzleInterface";

export const ROWS_FOR_TEXT_AREA = 7;
export const DEFAULT_PUZZLE_ANSWER = 'Puzzle Answer';
export const DEFAULT_PUZZLE_STRING = 'Put puzzle here and click words below to #hide# #words#';


declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

export function Create() {
  const [puzzleAnswer, setPuzzleAnswer] = useState(DEFAULT_PUZZLE_ANSWER);
  const [puzzleString, setPuzzleString] = useState(DEFAULT_PUZZLE_STRING);
  const [encodedLinkString, setEncodedLinkString] = useState('');

  return (
    <div className="centerMiddle">
      <div className="lightStyle">
        <PuzzleTextEntry
          puzzleAnswerLabel="Enter Puzzle Answer"
          puzzleAnswer={puzzleAnswer}
          savePuzzleAnswer={setPuzzleAnswer}
          textAreaLabel = "Enter Puzzle Text"
          puzzleTextAreaString = {puzzleString}
          savePuzzleTextAreaString = {setPuzzleString}
          updateEncodedLinkString = {setEncodedLinkString}
        />
      </div>
      <br />
      <div className="lightStyle">
        <PuzzleInterface 
          puzzleString={puzzleString}
          savePuzzleString = {setPuzzleString}
          updateEncodedLinkString = {setEncodedLinkString}
        />
      </div>
      <br />
      <div className="mediumStyle">
        <LinkDisplay 
          labelText="A link to this puzzle is"
          linkText={encodedLinkString}
        />
      </div>
    </div>
  );
}


