import { useState } from "react";
import { makeShowButtonForFirstCharacter, makeShowButtonSX, makeSolveButtonForFirstCharacter, makeSolveButtonSX, PuzzleButtonGroup } from "../common/puzzleButtonGroup";
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

    if(!puzzleString){
        return(<div></div>);
    }
    const puzzleWords : string[] = puzzleString.split(WORD_DELIMITER);
    
    const toggleWordByIndex = (index: number) => {
        puzzleWords[index] = toRevealedWordIfHidden(puzzleWords[index]);
        setPuzzleString(puzzleWords.join(WORD_DELIMITER));
    }

    const updateAnswerLetterByIndex = (indexToUpdate: number) => {
        const updatedAnswerLetters : string[] = formattedAnswerLetters.map((letter: string, index:number) => index==indexToUpdate ? getBaseWord(letter) : letter );
        setFormattedAnswerLetters(updatedAnswerLetters);
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
                buttonWords={formattedAnswerLetters} 
                onClickAction={updateAnswerLetterByIndex}
                //makeStyledButtonForString={makeShowButtonForFirstCharacter}
                makeStyledButtonForString={makeShowButtonSX}
            />
            <PuzzleAnswerEntry
                checkAndUpdateIsSolved={checkAndUpdateIsSolved}
            />
            <PuzzleButtonGroup 
                buttonWords={puzzleWords} 
                onClickAction={toggleWordByIndex}
                //makeStyledButtonForString={makeSolveButtonForFirstCharacter}
                makeStyledButtonForString={makeSolveButtonSX}
            />
        </div>);
}

function makeInitialFormattedCorrectAnswer(correctAnswer: string) {
    return correctAnswer.split("").map(toHiddenUnlessSpace);
}