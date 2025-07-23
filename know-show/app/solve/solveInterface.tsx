import { useState } from "react";
import { createButtonsFromConfig, makeShowButtonForFirstCharacter, makeShowButtonSX, makeSolveButtonForFirstCharacter, makeSolveButtonSX, PuzzleButtonGroup, type PuzzleButtonGroupConfig } from "../common/puzzleButtonGroup";
import { MARK_HIDDEN, WORD_DELIMITER } from "~/constants";
import { getBaseWord, toHiddenUnlessSpace, toRevealedWordIfHidden } from "~/util/modifyWord";
import { PuzzleAnswerEntry } from "./puzzleAnswerEntry";
import Button from "@mui/material/Button";

//Puzzle interface for viewing and modifying the puzzleString
interface PuzzleInterfaceProps {
    puzzleCorrectAnswer : string;
    initialPuzzleString : string; //The string to display in the interface
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
    const [formattedAnswerLetters, setFormattedAnswerLetters] = useState(makeInitialFormattedCorrectAnswer(props.puzzleCorrectAnswer))
    const [puzzleString, setPuzzleString] = useState(props.initialPuzzleString);
    const [isSolved, setIsSolved] = useState(false);
    //TODO: Need to add solution to link string in all update cases

    const initialAnswerButtons =  createAnswerButtons(formattedAnswerLetters);

    const initialPuzzleButtons = createPuzzleButtons(makePuzzleWordsFromPuzzleString(puzzleString));


    const defaultButtonArray : Array<React.ReactElement> = [];
    const [formattedAnswerButtons, setFormattedAnswerButtons] = useState(defaultButtonArray);

    const [formattedPuzzleButtons, setFormattedPuzzleButtons] = useState(defaultButtonArray);
    
    if(!puzzleString){
        return(<div></div>);
    }

    const makePuzzleWordsFromPuzzleString = (inputPuzzleString : string): string[] => {
        return puzzleString.split(WORD_DELIMITER);
    }
    
    const toggleWordByIndex = (desiredIndex: number) => {
        const puzzleWords = makePuzzleWordsFromPuzzleString(puzzleString);
        const updatedPuzzleWords = puzzleWords.map((word:string, index:number) => index === desiredIndex ? toRevealedWordIfHidden(word) : word);
        setPuzzleString(puzzleWords.join(WORD_DELIMITER));
        const puzzleButtons = createPuzzleButtons(puzzleWords);
        setFormattedPuzzleButtons(puzzleButtons);
    }

    const createPuzzleButtons = (puzzleWords: string[]): React.ReactElement[] => {
        const puzzleButtonGroupConfig : PuzzleButtonGroupConfig =
        {
            buttonWords:  puzzleWords,
            onClickAction: toggleWordByIndex,
            makeStyledButtonForString: makeSolveButtonSX
        }
        const updatedPuzzleButtons = createButtonsFromConfig(puzzleButtonGroupConfig);
        return updatedPuzzleButtons;
    }

    const updateAnswerLetterByIndex = (indexToUpdate: number) => {
        const updatedAnswerLetters : string[] = formattedAnswerLetters.map((letter: string, index:number) => index==indexToUpdate ? getBaseWord(letter) : letter );
        setFormattedAnswerLetters(updatedAnswerLetters);

        const updatedAnswerButtons = createAnswerButtons(updatedAnswerLetters);
        setFormattedAnswerButtons(updatedAnswerButtons);
    }

    const createAnswerButtons = (answerLetters : string[]) : React.ReactElement[] =>{
        const puzzleButtonGroupConfig : PuzzleButtonGroupConfig = 
            {buttonWords : answerLetters, 
                onClickAction : updateAnswerLetterByIndex,
                makeStyledButtonForString : makeShowButtonSX
            }
        const updatedAnswerButtons = createButtonsFromConfig(puzzleButtonGroupConfig);
        return updatedAnswerButtons;
    }

    const checkAndUpdateIsSolved = (rawEnteredAnswer: string) => {
        const enteredAnswer = rawEnteredAnswer.trim();
        if (props.puzzleCorrectAnswer != null && props.puzzleCorrectAnswer === enteredAnswer) {
            alert("Correct!");
            setIsSolved(true);
        }else{
            alert('(Not correct)');
            setIsSolved(false);
        }
    }


    return(
        <div>
            <PuzzleButtonGroup 
                buttonArray={formattedAnswerButtons}
            />
            <PuzzleAnswerEntry
                checkAndUpdateIsSolved={checkAndUpdateIsSolved}
            />
            <PuzzleButtonGroup
                buttonArray={formattedPuzzleButtons}
            />
        </div>);
}

function makeInitialFormattedCorrectAnswer(correctAnswer: string) {
    return correctAnswer.split("").map(toHiddenUnlessSpace);
}