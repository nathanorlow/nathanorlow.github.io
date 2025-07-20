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
  if(encodedString == null){
    return <a href="/solve">Use Solve page to generate a link!</a>;
  }
  const puzzleString = atob(encodedString as string); //use base 64 decode

  return (
    <div className="centerMiddle">
      <div className="lightStyle">
        {puzzleString}<br />
        <PuzzleInterface 
          initialPuzzleString={puzzleString ?? ''}
        />
      </div>
    </div>
  );
}


