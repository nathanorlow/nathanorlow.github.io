import { useState } from "react";
import { createButtonsFromConfig, PuzzleButtonGroup } from "../common/puzzleButtonGroup";
import { COMPONENT_DELIMITER } from "~/constants";
import { toHiddenUnlessSpace } from "~/util/modifyWord";
import { PuzzleAnswerEntry } from "./puzzleAnswerEntry";
import { PuzzlePhrase } from "~/util/PuzzlePhrase";

//Puzzle interface for viewing and modifying the puzzleString
interface PuzzleInterfaceProps {
    puzzleCorrectAnswer : string;
    initialPuzzleString : string; //The string to display in the interface
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
    const [isSolved, setIsSolved] = useState(false);
    const [puzzlePhrase, setPuzzlePhrase] = useState(PuzzlePhrase.fromFormattedPromptString(props.initialPuzzleString));
    const [answerPhrase, setAnswerPhrase] = useState(PuzzlePhrase.fromFormattedAnswerString(makeInitialFormattedCorrectAnswer(props.puzzleCorrectAnswer)));
    
    const showSectionByIndex = (indexToUpdate: number) => {
        setPuzzlePhrase(puzzlePhrase.withSectionShownIfHidden(indexToUpdate));
    }

    const createPuzzleButtons = (inputPuzzlePhrase: PuzzlePhrase): React.ReactElement[] => {
        return createButtonsFromConfig({
            puzzlePhrase: inputPuzzlePhrase,
            onClickAction: showSectionByIndex
        });
    }

    const updateAnswerStringByIndex = (indexToUpdate: number) => {
        setAnswerPhrase(answerPhrase.withSectionShownIfHidden(indexToUpdate));
    }

    const createAnswerButtons = (inputAnswerPhrase : PuzzlePhrase) : React.ReactElement[] => {
        return createButtonsFromConfig({   
            puzzlePhrase: inputAnswerPhrase,
            onClickAction: updateAnswerStringByIndex
        });
    }

    const checkAndUpdateIsSolved = (rawEnteredAnswer: string) => {
        const enteredAnswer = rawEnteredAnswer.trim();
        if (props.puzzleCorrectAnswer != null && props.puzzleCorrectAnswer.toLowerCase === enteredAnswer.toLowerCase) {
            alert("Correct!");
            setIsSolved(true);
        }else{
            alert('(Not correct)');
            console.log(`entered |${enteredAnswer}| correct ${props.puzzleCorrectAnswer}`);
            setIsSolved(false);
        }
    }

    const answerButtons = createAnswerButtons(answerPhrase);
    const puzzleButtons = createPuzzleButtons(puzzlePhrase);

    return(
        <div>
            <PuzzleButtonGroup 
                buttonArray={answerButtons}
            />
            <PuzzleAnswerEntry
                checkAndUpdateIsSolved={checkAndUpdateIsSolved}
            />
            <PuzzleButtonGroup
                buttonArray={puzzleButtons}
            />
        </div>
    );
}

function makeInitialFormattedCorrectAnswer(correctAnswer: string) {
    return correctAnswer.split("").map(toHiddenUnlessSpace).join(COMPONENT_DELIMITER);
}