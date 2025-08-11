import { PuzzlePhrase } from "~/util/PuzzlePhrase";

//Puzzle interface for viewing and modifying the puzzleString

interface ButtonInterfaceProps {
    puzzlePhrase : PuzzlePhrase;
    savePuzzlePhrase : (puzzlePhrase: PuzzlePhrase) => void
}

export function ButtonInterface(props : ButtonInterfaceProps){
    
    const toggleSectionByIndex = (indexToUpdate: number) => {
        props.savePuzzlePhrase(props.puzzlePhrase.withSectionToggled(indexToUpdate))
    }

    const puzzleButtons = props.puzzlePhrase.createButtonsWithActionOnIndex(toggleSectionByIndex);
    
    return(<div className="createButtonInterface">
            {puzzleButtons} 
        </div>);
}