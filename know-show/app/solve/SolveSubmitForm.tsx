import { useState } from "react";

const DEFAULT_ENTERED_ANSWER = '(enter answer here)';

interface SolveSubmitFormProps {
    onSubmitAnswer : (submitEvent: any) => void;
}

export function SolveSubmitForm(props: SolveSubmitFormProps){
    const [enteredAnswer, setEnteredAnswer] = useState(DEFAULT_ENTERED_ANSWER);

    return (
        <div className="solveSubmitForm">
            <form onSubmit={props.onSubmitAnswer}>
                <label> 
                    <input
                    type="text"
                    value={enteredAnswer}
                    onChange={ (changeEvent: any) => setEnteredAnswer(changeEvent.target.value) }
                    className="solveFormTextEntry"
                    />
                </label>
                <button type="submit" className="solveFormSubmitButton">Submit</button>
            </form>
        </div>
    )
}

