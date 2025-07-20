import { useState } from "react";
import { PuzzleInterface } from "./puzzleInterface";
import { useParams } from "react-router";
import { COMPONENT_DELIMITER } from "~/constants";

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
  const puzzleAnswerAndString = atob(encodedString as string); //use base 64 decode
  const puzzleComponents: string[] = puzzleAnswerAndString.split(COMPONENT_DELIMITER);
  
  if(!puzzleComponents || puzzleComponents.length < 2){
    return <a href="/solve">Make sure to specify a puzzle and answer!</a>;
  }

  return (
    <div className="centerMiddle">
      <div className="lightStyle">
        {puzzleAnswerAndString}<br />
        <PuzzleInterface 
          puzzleCorrectAnswer={puzzleComponents[0]}
          initialPuzzleString={puzzleComponents[1] ?? ''}
        />
      </div>
    </div>
  );
}


