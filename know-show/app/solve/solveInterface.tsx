import { useState } from "react";
// import { PuzzleButtonGroup } from "../common/puzzleButtonGroup";
import { COMPONENT_DELIMITER } from "~/constants";
import { normalizeString, toHiddenUnlessSpace } from "~/util/modifyWord";
import { SolveSubmitForm } from "./SolveSubmitForm";
import { PuzzlePhrase } from "~/util/PuzzlePhrase";

//Puzzle interface for viewing and modifying the puzzleString
interface SolveInterfaceProps {
    //these are assumed to already be normalized
    puzzleCorrectAnswer : string;
    initialPuzzleString : string; //The string to display in the interface
}

export type ActionOnIndex = (indexToUpdate: number) => void;

export function SolveInterface(props : SolveInterfaceProps){
    const [submittedAnswer, setSubmittedAnswer] = useState("");
    const [puzzlePhrase, setPuzzlePhrase] = useState(PuzzlePhrase.fromFormattedPromptString(props.initialPuzzleString));
    const [answerPhrase, setAnswerPhrase] = useState(PuzzlePhrase.fromFormattedAnswerString(makeInitialFormattedCorrectAnswer(props.puzzleCorrectAnswer)));
    

    const onSubmitAnswer = (submitEvent: any) => {
        submitEvent.preventDefault();
        const rawSubmittedAnswer = submitEvent.target.value;
        setSubmittedAnswer(normalizeString(rawSubmittedAnswer));
        if (props.puzzleCorrectAnswer === submittedAnswer) {
            alert("Correct!");
        }else{
            alert('(Not correct)');
            console.log(`submitted |${submittedAnswer}| correct ${props.puzzleCorrectAnswer}`);
        }
    }

    const showSectionByIndex: ActionOnIndex = (indexToUpdate: number) => {
        setPuzzlePhrase(puzzlePhrase.withSectionShownIfHidden(indexToUpdate));
    }
    const updateAnswerStringByIndex: ActionOnIndex = (indexToUpdate: number) => {
        setAnswerPhrase(answerPhrase.withSectionShownIfHidden(indexToUpdate));
    }

    const answerButtons = answerPhrase.createButtonsWithActionOnIndex(updateAnswerStringByIndex);
    const puzzleButtons = puzzlePhrase.createButtonsWithActionOnIndex(showSectionByIndex);

    return(
        <div className="solveInterface">
            <div className="buttonGroup">
                {answerButtons}
            </div>
            <SolveSubmitForm
                onSubmitAnswer={onSubmitAnswer}
            />
            <div className="buttonGroup">
                {puzzleButtons}
            </div>
        </div>
    );
}

function makeInitialFormattedCorrectAnswer(correctAnswer: string) {
    return correctAnswer.split("").map(toHiddenUnlessSpace).join(COMPONENT_DELIMITER);
}