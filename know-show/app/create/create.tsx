import { useState } from "react";
import { PuzzleTextEntry } from "./puzzleTextEntry";
import { LinkDisplay } from "./linkDisplay";
import { PuzzleInterface } from "./puzzleInterface";

export const ROWS_FOR_TEXT_AREA = 7;


declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

export function Create() {
  const [puzzleString, setPuzzleString] = useState('');
  const [encodedLinkString, setEncodedLinkString] = useState('');

  return (
    <div className="centerMiddle">
      <div className="lightStyle">
        <PuzzleTextEntry
          labelForTextArea = "Enter Puzzle Text"
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


