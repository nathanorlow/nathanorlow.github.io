import { PuzzleButtonGroup } from "./puzzleButtonGroup";

//Puzzle interface for viewing and modifying the puzzleString

interface PuzzleInterfaceProps {
    puzzleString : string; //The string to display in the interface
    savePuzzleString: (puzzleString: string) => void //a function to save puzzleString changes from the display
}

export function PuzzleInterface(props : PuzzleInterfaceProps){
    const setPuzzleString = props.savePuzzleString;

    const puzzleString : string = props.puzzleString;
    if(!puzzleString){
        return(<div></div>);
    }
    const puzzleWords : string[] = puzzleString.split(' ');
    
    const toggleWordByIndex = (index: number) => {
        puzzleWords[index] = toggleWord(puzzleWords[index]);
        setPuzzleString(puzzleWords.join(" "));
    }

    return(<div>
            <PuzzleButtonGroup 
                buttonWords={puzzleWords} 
                onClickAction={toggleWordByIndex}
            />
        </div>);
}

function toggleWord(word: string): string {
    if(!word){
        return ""
    };

    if(word.startsWith('-')){
        return wordWithoutHyphens(word);
    }else{
        return '-' + wordWithoutHyphens(word) + '-';
    }
}

export function wordWithoutHyphens(word: string): string {
    return word.replaceAll('-', '')
}