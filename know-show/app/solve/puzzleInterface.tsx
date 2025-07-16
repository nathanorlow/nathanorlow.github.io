import { useState } from "react";
import { PuzzleButtonGroup } from "./puzzleButtonGroup";

//Puzzle interface for viewing and modifying the puzzleString

const delimiter = '_';

interface PuzzleInterfaceProps {
    initialPuzzleString : string; //The string to display in the interface
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
  const [puzzleString, setPuzzleString] = useState(props.initialPuzzleString);

    if(!puzzleString){
        return(<div></div>);
    }
    const puzzleWords : string[] = puzzleString.split(delimiter);
    
    const toggleWordByIndex = (index: number) => {
        puzzleWords[index] = toggleWord(puzzleWords[index]);
        setPuzzleString(puzzleWords.join(delimiter));
    }

    return(<div>
            <PuzzleButtonGroup 
                buttonWords={puzzleWords} 
                onClickAction={toggleWordByIndex}
            />
        </div>);
}

function toggleWord(word: string): string {
    if(!word){
        return ""
    };

    console.log("Toggling " + word);
    //For unrevealed words, reveal (with tildes)
    //otherwise do nothing
    if(word.startsWith('-')){
        const returnWord = '~' + getBaseWord(word) + '~';
        console.log("Returning " + returnWord);
        return returnWord;
    }else{
        return word;
    }
}

export function getBaseWord(word: string): string {
    return word.replaceAll(/-|~/g, '');
}