import { useState } from "react";
import { PuzzleTextEntry } from "./puzzleTextEntry";
import { LinkDisplay } from "./linkDisplay";
import { PuzzleDisplay } from "./puzzleDisplay";
import { Button } from "@mui/material";

export function Create() {
  const [puzzleString, setPuzzleString] = useState('');
  const [encodedLinkString, setEncodedLinkString] = useState('');
  const rowsForTextArea = 7;

  return (
    <div className="centerMiddle">
      <div className="lightStyle">
        <PuzzleTextEntry
          setEncodedLinkString={setEncodedLinkString}
          puzzleString = {puzzleString}
          setPuzzleString = {setPuzzleString}
          rowsForTextArea={rowsForTextArea}
        />
      </div>
      <br />
      <Button
        key="material"
        onClick={() => {
          alert('clicked');
        }}
      >
        Click me
      </Button>
      <div className="lightStyle">
        <PuzzleDisplay 
          puzzleString={puzzleString}
          setPuzzleString = {setPuzzleString}          
        />
      </div>
      <br />
      <div className="mediumStyle">
        <LinkDisplay 
          encodedLinkString={encodedLinkString}
          rowsForTextArea={rowsForTextArea}
        />
      </div>
    </div>
  );
}


