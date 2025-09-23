import { useState } from "react";
// import { PuzzleButtonGroup } from "../common/puzzleButtonGroup";
import { COMPONENT_DELIMITER, MARK_BLOCKED, VALID_ANSWER_CHARACTER_REGEX as VALID_ANSWER_CHARACTER_REGEX } from "~/constants";
import { normalizeString, toggleWordHiddenFormat} from "~/util/modifyWord";
import { SolveSubmitForm, type AnswerFormValues } from "./SolveSubmitForm";
import { PuzzlePhrase } from "~/util/PuzzlePhrase";
import { SolvingDataDisplay } from "./solvingDataDisplay";

//Puzzle interface for viewing and modifying the puzzleString
interface SolveInterfaceProps {
    //these are assumed to already be normalized
    puzzleCorrectAnswer : string;
    initialPuzzleString : string; //The string to display in the interface
}

export type ActionOnIndex = (indexToUpdate: number) => void;

export function SolveInterface(props : SolveInterfaceProps){
    const [submittedAnswer, setSubmittedAnswer] = useState("");
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [puzzlePhrase, setPuzzlePhrase] = useState(
        PuzzlePhrase.fromFormattedPromptString(
            props.initialPuzzleString
        ));
    const [answerPhrase, setAnswerPhrase] = useState(
        PuzzlePhrase.fromFormattedAnswerString(
            makeInitialFormattedCorrectAnswer(props.puzzleCorrectAnswer)
        ));

    const [revealsAtSolve, setRevealsAtSolve] = useState(-1);
    const [isSolved, setIsSolved] = useState(false);
    const currentReveals: number = isSolved ? revealsAtSolve :
        answerPhrase.countShown() + puzzlePhrase.countShown();
    
    const onSubmitAnswer = (answerFormData: AnswerFormValues) => {
        const rawSubmittedAnswer = answerFormData.answer;
        console.log(`raw answer |${rawSubmittedAnswer}|`);
        const normalizedAnswer = normalizeString(rawSubmittedAnswer, VALID_ANSWER_CHARACTER_REGEX);
        const normalizedCorrectAnswer = normalizeString(props.puzzleCorrectAnswer, VALID_ANSWER_CHARACTER_REGEX);
        if (normalizedCorrectAnswer === normalizedAnswer) {
            //alert("Correct!");
            setRevealsAtSolve(currentReveals);
            setIsSolved(true);
            setPuzzlePhrase(puzzlePhrase.withAllSectionsShown());
            setAnswerPhrase(answerPhrase.withAllSectionsShown());
        }else{
            setWrongGuesses(wrongGuesses + 1);
            //alert('(Not correct)');
            console.log(`submitted |${normalizedAnswer}| correct ${normalizedCorrectAnswer}`);
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

    const doNothing = () => {};

    return(
        <div className="solveInterface">
            <div className="answerButtonGroup">
                {answerButtons}
            </div>
            <SolveSubmitForm
                onSubmitAnswer={isSolved ? doNothing : onSubmitAnswer}
            />
            <SolvingDataDisplay
                revealCount={currentReveals}
                wrongGuessCount={wrongGuesses}
            />
            <br />
            <div className="promptButtonGroup">
                {puzzleButtons}
            </div>
        </div>
    );
}

function makeInitialFormattedCorrectAnswer(correctAnswer: string) {
    if(!correctAnswer){
        return "";
    }
    const letters : string[] = correctAnswer.split("");
    const blockedFirstLetter = MARK_BLOCKED + letters.shift() + MARK_BLOCKED;
    const hiddenWord = letters.map(toggleWordHiddenFormat).join(COMPONENT_DELIMITER); //hide other letters (including space)
    const returnValue =  blockedFirstLetter + COMPONENT_DELIMITER + hiddenWord; // combine blocked and hidden
    return returnValue;
}