import { useState } from "react";
// import { PuzzleButtonGroup } from "../common/puzzleButtonGroup";
import { COMPONENT_DELIMITER } from "~/constants";
import { normalizeString, toHiddenUnlessSpace } from "~/util/modifyWord";
import { SolveSubmitForm, type AnswerFormValues } from "./SolveSubmitForm";
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
    

    const onSubmitAnswer = (answerFormData: AnswerFormValues) => {
        const rawSubmittedAnswer = answerFormData.answer;
        console.log(`answer ${rawSubmittedAnswer}`);
        const normalizedAnswer = normalizeString(rawSubmittedAnswer);
        if (props.puzzleCorrectAnswer === normalizedAnswer) {
            alert("Correct!");
        }else{
            alert('(Not correct)');
            console.log(`submitted |${normalizedAnswer}| correct ${props.puzzleCorrectAnswer}`);
        }
        setSubmittedAnswer(normalizedAnswer);
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
            <div className="answerButtonGroup">
                {answerButtons}
            </div>
            <SolveSubmitForm
                onSubmitAnswer={onSubmitAnswer}
            />
            <div className="promptButtonGroup">
                {puzzleButtons}
            </div>
        </div>
    );
}

function makeInitialFormattedCorrectAnswer(correctAnswer: string) {
    return correctAnswer.split("").map(toHiddenUnlessSpace).join(COMPONENT_DELIMITER);
}