import { useState } from "react";
import { createButtonsFromConfig, makeShowButtonSX, makeSolveButtonSX, PuzzleButtonGroup, type PuzzleButtonGroupConfig } from "../common/puzzleButtonGroup";
import { COMPONENT_DELIMITER } from "~/constants";
import { getBaseWord, modifyWordAtIndexInString, toHiddenUnlessSpace, toRevealedWordIfHidden, type ModifyWordInStringInputs } from "~/util/modifyWord";
import { PuzzleAnswerEntry } from "./puzzleAnswerEntry";

//Puzzle interface for viewing and modifying the puzzleString
interface PuzzleInterfaceProps {
    puzzleCorrectAnswer : string;
    initialPuzzleString : string; //The string to display in the interface
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
    const [formattedAnswerString, setFormattedAnswerString] = useState(makeInitialFormattedCorrectAnswer(props.puzzleCorrectAnswer))
    const [interfacePuzzleString, setInterfacePuzzleString] = useState(props.initialPuzzleString);
    const [isSolved, setIsSolved] = useState(false);
    
    if(!interfacePuzzleString){
        return(<div>No puzzle string</div>);
    }
    
    const toggleWordByIndex = (indexToUpdate: number) => {
        const modifyInputs: ModifyWordInStringInputs = {
            inputString: interfacePuzzleString,
            delimiter: COMPONENT_DELIMITER,
            desiredIndex: indexToUpdate,
            modifyFunction: toRevealedWordIfHidden
        };
        const newPuzzleString = modifyWordAtIndexInString(modifyInputs);
        setInterfacePuzzleString(newPuzzleString);
    }

    const createPuzzleButtons = (inputPuzzleString: string): React.ReactElement[] => {
        const puzzleButtonGroupConfig : PuzzleButtonGroupConfig =
        {
            delimitedString: inputPuzzleString,
            delimiter: COMPONENT_DELIMITER,
            onClickAction: toggleWordByIndex,
            makeStyledButtonForString: makeSolveButtonSX
        }
        return createButtonsFromConfig(puzzleButtonGroupConfig);
    }

    const updateAnswerStringByIndex = (indexToUpdate: number) => {
        const modifyInputs: ModifyWordInStringInputs = {
            inputString: formattedAnswerString,
            delimiter: COMPONENT_DELIMITER,
            desiredIndex: indexToUpdate,
            modifyFunction: getBaseWord
        };
        const newAnswerString = modifyWordAtIndexInString(modifyInputs);
        setFormattedAnswerString(newAnswerString);
    }

    const createAnswerButtons = (inputAnswerString : string) : React.ReactElement[] =>{
        const puzzleButtonGroupConfig : PuzzleButtonGroupConfig = 
            {   delimitedString : inputAnswerString, 
                delimiter: COMPONENT_DELIMITER,
                onClickAction : updateAnswerStringByIndex,
                makeStyledButtonForString : makeShowButtonSX
            }
        return createButtonsFromConfig(puzzleButtonGroupConfig);
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

    const answerButtons = createAnswerButtons(formattedAnswerString);
    const puzzleButtons = createPuzzleButtons(interfacePuzzleString);

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
        </div>);
}

function makeInitialFormattedCorrectAnswer(correctAnswer: string) {
    return correctAnswer.split("").map(toHiddenUnlessSpace).join(COMPONENT_DELIMITER);
}