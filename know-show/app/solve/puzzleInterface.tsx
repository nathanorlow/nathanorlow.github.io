import { useState } from "react";
import { PuzzleButtonGroup } from "./puzzleButtonGroup";
import { WORD_DELIMITER } from "~/constants";
import { toRevealedWordIfHidden } from "~/util/modifyWord";
import { PuzzleAnswerEntry } from "./puzzleAnswerEntry";

//Puzzle interface for viewing and modifying the puzzleString
interface PuzzleInterfaceProps {
    puzzleCorrectAnswer : string;
    initialPuzzleString : string; //The string to display in the interface
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
    const [puzzleString, setPuzzleString] = useState(props.initialPuzzleString);
    const [isSolved, setIsSolved] = useState(false);
    //TODO: Need to add solution to link string in all update cases

    if(!puzzleString){
        return(<div></div>);
    }
    const puzzleWords : string[] = puzzleString.split(WORD_DELIMITER);
    
    const toggleWordByIndex = (index: number) => {
        puzzleWords[index] = toRevealedWordIfHidden(puzzleWords[index]);
        setPuzzleString(puzzleWords.join(WORD_DELIMITER));
    }

    const checkAndUpdateIsSolved = (rawEnteredAnswer: string) => {
        const enteredAnswer = rawEnteredAnswer.trim();
        if (props.puzzleCorrectAnswer != null && props.puzzleCorrectAnswer === enteredAnswer) {
            alert("Correct!");
            setIsSolved(true);
        }else{
            alert('(Not correct)');
            setIsSolved(false);
        }
    }

    return(
        <div>
            <PuzzleAnswerEntry
                checkAndUpdateIsSolved={checkAndUpdateIsSolved}
            />
            <PuzzleButtonGroup 
                buttonWords={puzzleWords} 
                onClickAction={toggleWordByIndex}
            />
        </div>);
}

