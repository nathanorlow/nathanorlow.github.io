import { PuzzlePhrase } from "~/util/PuzzlePhrase";
import {isDefaultMode, type Mode } from "./mode/ModeButton";

//Puzzle interface for viewing and modifying the puzzleString

interface ButtonInterfaceProps {
    puzzlePhrase : PuzzlePhrase;
    savePuzzlePhrase : (puzzlePhrase: PuzzlePhrase) => void;
    currentMode: Mode;
}

export function ButtonInterface(props : ButtonInterfaceProps){
    const {currentMode} = props;
    const toggleSectionByIndex = (indexToUpdate: number) => {
        if(isDefaultMode(currentMode)){
            props.savePuzzlePhrase(props.puzzlePhrase.withSectionToggled(indexToUpdate));
        }else{
            props.savePuzzlePhrase(props.puzzlePhrase.withSectionModeSet(indexToUpdate, currentMode));
        }
    }

    const puzzleButtons = props.puzzlePhrase.createButtonsWithActionOnIndex(toggleSectionByIndex);
    
    return(<div className="createButtonInterface">
            {puzzleButtons} 
        </div>);
}