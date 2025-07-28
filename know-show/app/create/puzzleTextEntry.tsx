import { COMPONENT_DELIMITER } from "~/constants";
import { ROWS_FOR_TEXT_AREA } from "./create";
import { encodeLink } from "./linkDisplay";

interface PuzzleTextEntryProps {
    puzzleAnswerLabel: string;
    puzzleAnswer: string;
    savePuzzleAnswer: (puzzleAnswer: string) => void;
    puzzlePromptLabel: string; //Label to display by text area
    puzzlePrompt: string; //Puzzle string to display in its text area
    savePuzzlePrompt: (puzzleTextAreaString: string) => void; //Function to save the string outside this component
}

export function PuzzleTextEntry(props: PuzzleTextEntryProps){

const handlePuzzleAnswerChange = (changeEvent: any) => {
    const newPuzzleAnswer = changeEvent.target.value;
    props.savePuzzleAnswer(newPuzzleAnswer);
}

const handlePuzzlePromptChange = (changeEvent: any) => {
    const textAreaString = changeEvent.target.value;
    props.savePuzzlePrompt(textAreaString);
};

    return(
        <div className="mainTextEntry">
            <label className="labelText">{props.puzzleAnswerLabel}</label>
            <textarea
                className="puzzleAnswer"
                onChange={handlePuzzleAnswerChange}
                rows={1}
            />
            <br/>
            <label className="labelText">{props.puzzlePromptLabel}</label>
            <textarea
                className="puzzlePrompt"
                value={props.puzzlePrompt}
                onChange={handlePuzzlePromptChange}
                rows={ROWS_FOR_TEXT_AREA}
            />
        </div>
    );
}


