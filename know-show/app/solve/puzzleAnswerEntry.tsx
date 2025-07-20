import { useState } from "react";

const DEFAULT_ENTERED_ANSWER = '(enter answer here)';

interface PuzzleAnswerEntryProps {
    checkAndUpdateIsSolved : (enteredAnswe: string) => void;
}

export function PuzzleAnswerEntry(props: PuzzleAnswerEntryProps){
    const [enteredAnswer, setEnteredAnswer] = useState(DEFAULT_ENTERED_ANSWER);
    
    const handleEnteredAnswerChange = (changeEvent: any) => {
        const newPuzzleAnswer = changeEvent.target.value;
        setEnteredAnswer(newPuzzleAnswer);
    }

    const handleSubmit = (submitEvent: any) => {
        submitEvent.preventDefault();
        props.checkAndUpdateIsSolved(enteredAnswer);
    }

    //            <label className="largeText">{props.puzzleAnswerLabel}</label> <br />
    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <label> 
                    <input
                    type="text"
                    value={enteredAnswer}
                    onChange={handleEnteredAnswerChange}
                    className="answerEntry"
                    />
                </label>
                <button type="submit" className="submitButton">Submit</button>
            </form>
        </div>
    )
}

