import { WORD_DELIMITER} from "~/constants";
import { createButtonsFromConfig, makeSolveButtonSX, PuzzleButtonGroup, type PuzzleButtonGroupConfig } from "../common/puzzleButtonGroup";
import { modifyWordAtIndexInString, toggleWordHiddenFormat, type ModifyWordInStringInputs } from "~/util/modifyWord";
import { encodeLink } from "./linkDisplay";

//Puzzle interface for viewing and modifying the puzzleString

interface CreateInterfaceProps {
    puzzleString : string; //The string to display in the interface
    savePuzzleString: (puzzleString: string) => void //a function to save puzzleString changes from the display
    updateEncodedLinkString: (encodedLinkString: string) => void //a function to update the link
}

export function CreateInterface(props : CreateInterfaceProps){
    const setPuzzleString = props.savePuzzleString;
    const updateEncodedLinkString = props.updateEncodedLinkString;

    const puzzleString : string = props.puzzleString;
    if(!puzzleString){
        return(<div></div>);
    }
    
    const toggleWordByIndex = (indexToUpdate: number) => {
        const modifyInputs: ModifyWordInStringInputs = {
            inputString: puzzleString,
            delimiter: WORD_DELIMITER,
            desiredIndex: indexToUpdate,
            modifyFunction: toggleWordHiddenFormat
        };
        const newPuzzleString = modifyWordAtIndexInString(modifyInputs);
        setPuzzleString(newPuzzleString);

        const newEncodedLinkString = encodeLink(newPuzzleString);
        updateEncodedLinkString(newEncodedLinkString);
    }

        const createPuzzleButtons = (inputPuzzleString: string): React.ReactElement[] => {
            const puzzleButtonGroupConfig : PuzzleButtonGroupConfig =
            {
                delimitedString: inputPuzzleString,
                delimiter: WORD_DELIMITER,
                onClickAction: toggleWordByIndex,
                makeStyledButtonForString: makeSolveButtonSX
            }
            return createButtonsFromConfig(puzzleButtonGroupConfig);
        }

        const puzzleButtons = createPuzzleButtons(puzzleString);
    
    return(<div>
            <PuzzleButtonGroup 
                buttonArray={puzzleButtons}
            />
        </div>);
}