import { WORD_DELIMITER} from "~/constants";
import { PuzzleButtonGroup } from "./puzzleButtonGroup";
import { toggleWordHiddenFormat } from "~/util/modifyWord";
import { encodeLink } from "./linkDisplay";

//Puzzle interface for viewing and modifying the puzzleString

interface PuzzleInterfaceProps {
    puzzleString : string; //The string to display in the interface
    savePuzzleString: (puzzleString: string) => void //a function to save puzzleString changes from the display
    updateEncodedLinkString: (encodedLinkString: string) => void //a function to update the link
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
    const setPuzzleString = props.savePuzzleString;
    const updateEncodedLinkString = props.updateEncodedLinkString;

    const puzzleString : string = props.puzzleString;
    if(!puzzleString){
        return(<div></div>);
    }
    const puzzleWords : string[] = puzzleString.split(WORD_DELIMITER);
    
    const toggleWordByIndex = (index: number) => {
        puzzleWords[index] = toggleWordHiddenFormat(puzzleWords[index]);
        const newPuzzleString = puzzleWords.join(WORD_DELIMITER); 
        setPuzzleString(newPuzzleString);
        const newEncodedLinkString = encodeLink(newPuzzleString);
        updateEncodedLinkString(newEncodedLinkString);
    }

    return(<div>
            <PuzzleButtonGroup 
                buttonWords={puzzleWords} 
                onClickAction={toggleWordByIndex}
            />
        </div>);
}