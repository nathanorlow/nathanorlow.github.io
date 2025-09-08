import { SolveInterface } from "./solveInterface";
import { useParams } from "react-router";
import { COMPONENT_DELIMITER } from "~/constants";
import { LinkDisplay } from "~/create/linkDisplay";

export const ROWS_FOR_TEXT_AREA = 7;


declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

export interface PuzzleComponents {
  initialPuzzleAnswer: string;
  initialPuzzlePrompt: string;
}

export function getPuzzleComponentsFromString(encodedString: string | undefined): PuzzleComponents {
  if(encodedString == undefined){
    return {initialPuzzleAnswer: '', initialPuzzlePrompt: ''};
  }
  const puzzleAnswerAndPrompt = atob(encodedString as string); //use base 64 decode
  const puzzleComponents: string[] = puzzleAnswerAndPrompt.split(COMPONENT_DELIMITER);
  return {initialPuzzleAnswer: puzzleComponents[0], initialPuzzlePrompt: puzzleComponents[1]};
}

export function Solve() {
  const {encodedString} = useParams();
  if(encodedString == null){
    return <a href="/solve">Use the Solve page to generate a link!</a>;
  }
  const {initialPuzzleAnswer, initialPuzzlePrompt} = getPuzzleComponentsFromString(encodedString);
  
  if(initialPuzzleAnswer == undefined || initialPuzzlePrompt == undefined){
    return <a href="/solve">Make sure to specify a puzzle and answer!</a>;
  }

  const createLink = "/create/" + encodedString;

  return (
    <div className="solveLayout">
        <SolveInterface 
          puzzleCorrectAnswer={initialPuzzleAnswer}
          initialPuzzleString={initialPuzzlePrompt}
        />
        <br />
        <LinkDisplay
          buttonText="Click here to edit this prompt (can copy a link)"
          link={createLink}
        />
    </div>
  );
}


