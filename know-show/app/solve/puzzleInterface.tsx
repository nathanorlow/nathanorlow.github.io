import { useState } from "react";
import { PuzzleButtonGroup } from "./puzzleButtonGroup";
import { WORD_DELIMITER } from "~/constants";
import { toRevealedWordIfHidden } from "~/util/modifyWord";

//Puzzle interface for viewing and modifying the puzzleString
interface PuzzleInterfaceProps {
    initialPuzzleString : string; //The string to display in the interface
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
    const [puzzleString, setPuzzleString] = useState(props.initialPuzzleString);

    if(!puzzleString){
        return(<div></div>);
    }
    const puzzleWords : string[] = puzzleString.split(WORD_DELIMITER);
    
    const toggleWordByIndex = (index: number) => {
        puzzleWords[index] = toRevealedWordIfHidden(puzzleWords[index]);
        setPuzzleString(puzzleWords.join(WORD_DELIMITER));
    }

    return(
        <div>
            <PuzzleButtonGroup 
                buttonWords={puzzleWords} 
                onClickAction={toggleWordByIndex}
            />
        </div>);
}

