import { useState } from "react";
import { useForm } from "react-hook-form";

const DEFAULT_ENTERED_ANSWER = '(enter answer here)';

interface SolveSubmitFormProps {
    onSubmitAnswer : (submitEvent: any) => void;
}

export interface AnswerFormValues {
    answer: string;
}

export function SolveSubmitForm(props: SolveSubmitFormProps){
    const [enteredAnswer, setEnteredAnswer] = useState(DEFAULT_ENTERED_ANSWER);
    const { register, handleSubmit } = useForm<AnswerFormValues>();

    return (
        <div className="solveSubmitForm">
            <form onSubmit={handleSubmit(props.onSubmitAnswer)}>
                <label> 
                    <input {...register("answer")}
                    type="text"
                    value={enteredAnswer}
                    onChange={ (changeEvent: any) => setEnteredAnswer(changeEvent.target.value) }
                    className="solveFormTextEntry"
                    />
                </label>
                <button className="solveFormSubmitButton">Submit</button>
            </form>
        </div>
    )
}