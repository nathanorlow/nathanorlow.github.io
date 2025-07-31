import { createButtonsFromConfig, PuzzleButtonGroup, type PuzzleButtonGroupConfig } from "../common/puzzleButtonGroup";
import { PuzzlePhrase } from "~/util/PuzzlePhrase";

//Puzzle interface for viewing and modifying the puzzleString

interface ButtonInterfaceProps {
    puzzlePhrase : PuzzlePhrase;
    savePuzzlePhrase : (puzzlePhrase: PuzzlePhrase) => void
}

export function ButtonInterface(props : ButtonInterfaceProps){
    
    const toggleWordByIndex = (indexToUpdate: number) => {
        props.savePuzzlePhrase(props.puzzlePhrase.withToggledButton(indexToUpdate))
    }

    const createPuzzleButtons = (inputPuzzlePhrase: PuzzlePhrase): React.ReactElement[] => {
        const puzzleButtonGroupConfig : PuzzleButtonGroupConfig =
        {
            puzzlePhrase: inputPuzzlePhrase,
            onClickAction: toggleWordByIndex
        }
        return createButtonsFromConfig(puzzleButtonGroupConfig);
    }

    const puzzleButtons = createPuzzleButtons(props.puzzlePhrase);
    
    return(<div className="buttonInterface">
            <PuzzleButtonGroup 
                buttonArray={puzzleButtons}
            />
        </div>);
}