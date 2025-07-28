import { WORD_DELIMITER} from "~/constants";
import { createButtonsFromConfig, makeSolveButtonSX, PuzzleButtonGroup, type PuzzleButtonGroupConfig } from "../common/puzzleButtonGroup";
import { modifyWordAtIndexInString, toggleWordHiddenFormat, type ModifyWordInStringInputs } from "~/util/modifyWord";

//Puzzle interface for viewing and modifying the puzzleString

interface ButtonInterfaceProps {
    puzzlePrompt : string; //The string to display in the interface
    savePuzzlePrompt: (puzzlePrompt: string) => void //a function to save puzzleString changes from the display
}

export function ButtonInterface(props : ButtonInterfaceProps){
    const setPuzzlePrompt = props.savePuzzlePrompt;
    const puzzlePrompt : string = props.puzzlePrompt;
    if(!puzzlePrompt){
        return(<div></div>);
    }
    
    const toggleWordByIndex = (indexToUpdate: number) => {
        const modifyInputs: ModifyWordInStringInputs = {
            inputString: puzzlePrompt,
            delimiter: WORD_DELIMITER,
            desiredIndex: indexToUpdate,
            modifyFunction: toggleWordHiddenFormat
        };
        const newPuzzlePrompt = modifyWordAtIndexInString(modifyInputs);
        setPuzzlePrompt(newPuzzlePrompt);
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

    const puzzleButtons = createPuzzleButtons(puzzlePrompt);
    
    return(<div className="buttonInterface">
            <PuzzleButtonGroup 
                buttonArray={puzzleButtons}
            />
        </div>);
}