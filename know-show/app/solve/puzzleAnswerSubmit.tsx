import { useState } from "react";

const DEFAULT_ENTERED_ANSWER = '(enter answer here)';

interface PuzzleAnswerEntryProps {
    onSubmitAnswer : (submitEvent: any) => void;
}

export function PuzzleAnswerSubmit(props: PuzzleAnswerEntryProps){
    const [enteredAnswer, setEnteredAnswer] = useState(DEFAULT_ENTERED_ANSWER);

    return (
        <div className="formContainer">
            <form onSubmit={props.onSubmitAnswer}>
                <label> 
                    <input
                    type="text"
                    value={enteredAnswer}
                    onChange={ (changeEvent: any) => setEnteredAnswer(changeEvent.target.value) }
                    className="answerEntry"
                    />
                </label>
                <button type="submit" className="submitButton">Submit</button>
            </form>
        </div>
    )
}

