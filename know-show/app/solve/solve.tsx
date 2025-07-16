import { useState } from "react";
import { PuzzleInterface } from "./puzzleInterface";
import { useParams } from "react-router";

export const ROWS_FOR_TEXT_AREA = 7;


declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

export function Solve() {
  const {encodedString} = useParams();
  //TODO: convert encodedString to puzzleString

  return (
    <div className="centerMiddle">
      <div className="lightStyle">
        {encodedString}<br />
        <PuzzleInterface 
          initialPuzzleString={encodedString ?? ''}
        />
      </div>
    </div>
  );
}


