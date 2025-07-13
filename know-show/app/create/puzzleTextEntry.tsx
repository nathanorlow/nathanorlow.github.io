import  React from "react";

interface PuzzleTextEntryProps {
    puzzleString: string;
    setPuzzleString: (argo0: string) => void;
    setEncodedLinkString: (arg0: string) => void; 
    rowsForTextArea: number;
}


export function PuzzleTextEntry(props: PuzzleTextEntryProps){

const handlePuzzleStringChange = (changeEvent: any) => {
    const inputString = changeEvent.target.value;
    props.setPuzzleString(inputString);
    const encodedInputString = encodeLink(inputString);
    props.setEncodedLinkString(encodedInputString);
};

    return(
        <div>
            <label className="largeText">Enter Puzzle Text</label> <br />
            <textarea
            value={props.puzzleString}
            onChange={handlePuzzleStringChange}
            rows={props.rowsForTextArea}
            />
        </div>
    );
}

function encodeLink(inputString : string) : string {
  return inputString.replaceAll(" ","-");
}
