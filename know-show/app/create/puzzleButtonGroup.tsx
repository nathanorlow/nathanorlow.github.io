import { Button } from "@mui/material";
import { wordWithoutHyphens } from "./puzzleDisplay";

interface PuzzleButtonGroupProps {
    puzzleWords : string[];
    toggleWordByIndex: (index: number) => void;
}

export function PuzzleButtonGroup(props : PuzzleButtonGroupProps){
    const puzzleWords : string[] = props.puzzleWords;
    if(!puzzleWords){
        return(
            <div>Nothing to list</div>
        )
    }

    const puzzleButtons = puzzleWords.map(
        (word, index) =>
        { return (
            <Button 
                color={word.startsWith('-') ? "success" : "secondary"}
                key={"button_" + index} 
                onClick={() => props.toggleWordByIndex(index)}
            >
                {wordWithoutHyphens(word)}
            </Button> 
        ) }
    );

    const puzzleButtonsNew = (
            <div><Button key="first">First</Button><Button key="second">Second</Button></div>
    );

    /*const puzzleButtons = puzzleWords.map(
        word =>
        { return (
            <Button 
                key={word} 
                onClick={() => props.toggleWordByIndex(1)}
            >
                {"?" + word + "?"}
            </Button>
        ) }
    );*/

    
    return puzzleButtons ;
}