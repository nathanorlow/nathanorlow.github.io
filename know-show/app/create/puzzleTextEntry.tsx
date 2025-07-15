import { ROWS_FOR_TEXT_AREA } from "./create";
import { encodeLink as encodeAsLink } from "./linkDisplay";

interface PuzzleTextEntryProps {
    labelForTextArea: string; //Label to display by text area
    puzzleTextAreaString: string; //Puzzle string to display in its text area
    savePuzzleTextAreaString: (puzzleTextAreaString: string) => void; //Function to save the string outside this component
    updateEncodedLinkString: (encodedLinkString: string) => void; //Function to save the encoded link string
}

export function PuzzleTextEntry(props: PuzzleTextEntryProps){

const handlePuzzleTextAreaChange = (changeEvent: any) => {
    const textAreaString = changeEvent.target.value;
    props.savePuzzleTextAreaString(textAreaString);
    props.updateEncodedLinkString(encodeAsLink(textAreaString));
};

    return(
        <div>
            <label className="largeText">{props.labelForTextArea}</label> <br />
            <textarea
                value={props.puzzleTextAreaString}
                onChange={handlePuzzleTextAreaChange}
                rows={ROWS_FOR_TEXT_AREA}
            />
        </div>
    );
}


