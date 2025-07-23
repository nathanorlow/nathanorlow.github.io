import { COMPONENT_DELIMITER } from "~/constants";
import { ROWS_FOR_TEXT_AREA } from "./create";
import { encodeLink } from "./linkDisplay";

interface PuzzleTextEntryProps {
    puzzleAnswerLabel: string;
    puzzleAnswer: string;
    savePuzzleAnswer: (puzzleAnswer: string) => void;
    textAreaLabel: string; //Label to display by text area
    puzzleTextAreaString: string; //Puzzle string to display in its text area
    savePuzzleTextAreaString: (puzzleTextAreaString: string) => void; //Function to save the string outside this component
    updateEncodedLinkString: (encodedLinkString: string) => void; //Function to save the encoded link string
}

export function PuzzleTextEntry(props: PuzzleTextEntryProps){

const handlePuzzleAnswerChange = (changeEvent: any) => {
    const newPuzzleAnswer = changeEvent.target.value;
    props.savePuzzleAnswer(newPuzzleAnswer);
    const answerAndTextAreaString = newPuzzleAnswer + COMPONENT_DELIMITER + props.puzzleTextAreaString;
    console.log(`answer change -> Encode link ${answerAndTextAreaString}`);
    props.updateEncodedLinkString(encodeLink(answerAndTextAreaString));
}

const handlePuzzleTextAreaChange = (changeEvent: any) => {
    const textAreaString = changeEvent.target.value;
    props.savePuzzleTextAreaString(textAreaString);
    const answerAndTextAreaString = props.puzzleAnswer + COMPONENT_DELIMITER + textAreaString;
    console.log(`textarea change -> Encode link ${answerAndTextAreaString}`);
    props.updateEncodedLinkString(encodeLink(answerAndTextAreaString));
};

    return(
        <div>
            <label className="largeText">{props.puzzleAnswerLabel}</label> <br />
            <textarea
                onChange={handlePuzzleAnswerChange}
                rows={1}
            />

            <label className="largeText">{props.textAreaLabel}</label> <br />
            <textarea
                value={props.puzzleTextAreaString}
                onChange={handlePuzzleTextAreaChange}
                rows={ROWS_FOR_TEXT_AREA}
            />
        </div>
    );
}


