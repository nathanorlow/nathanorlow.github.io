import { ROWS_FOR_TEXT_AREA } from "./create";
import { PuzzlePhrase } from "~/util/PuzzlePhrase";

interface createInterfaceProps {
    puzzleAnswerLabel: string;
    puzzleAnswer: string;
    savePuzzleAnswer: (puzzleAnswer: string) => void;
    puzzlePromptLabel: string; //Label to display by text area
    puzzlePhrase: PuzzlePhrase; //Puzzle string to display in its text area
    savePuzzlePhrase: (puzzlePhrase: PuzzlePhrase) => void; //Function to save the string outside this component
}

export function CreateInterface(props: createInterfaceProps){

    const handlePuzzleAnswerChange = (changeEvent: any) => {
        const newPuzzleAnswer = changeEvent.target.value;
        props.savePuzzleAnswer(newPuzzleAnswer);
    }

    const handlePuzzlePromptChange = (changeEvent: any) => {
        const textAreaString = changeEvent.target.value;
        props.savePuzzlePhrase(PuzzlePhrase.fromFormattedPromptString(textAreaString));
    };

    const puzzlePrompt : string = props.puzzlePhrase.toFormattedPromptString();

    return(
        <div className="createInterface">
            <label className="createLabelText">{props.puzzleAnswerLabel}</label>
            <textarea
                className="puzzleAnswer"
                onChange={handlePuzzleAnswerChange}
                rows={1}
            />
            <br/>
            <label className="createLabelText">{props.puzzlePromptLabel}</label>
            <textarea
                className="puzzlePrompt"
                value={puzzlePrompt}
                onChange={handlePuzzlePromptChange}
                rows={ROWS_FOR_TEXT_AREA}
            />
        </div>
    );
}


