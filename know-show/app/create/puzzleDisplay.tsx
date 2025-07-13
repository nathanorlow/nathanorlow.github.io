import { PuzzleButtonGroup } from "./puzzleButtonGroup";

interface PuzzleDisplayProps {
    puzzleString : string;
    setPuzzleString: (arg0: string) => void
}

export function PuzzleDisplay(props : PuzzleDisplayProps){
    const setPuzzleString = props.setPuzzleString;

    const puzzleString : string = props.puzzleString;
    if(!puzzleString){
        return(
            <div></div>
        )
    }
    const puzzleWords : string[] = puzzleString.split(' ');
    
    const toggleWordByIndex = (index: number) => {
        console.log("Toggeled index " + index + " "+ puzzleWords[index]);
        puzzleWords[index] = toggleWord(puzzleWords[index]);
        setPuzzleString(puzzleWords.join(" "));
    }

    return(
        <div>
        <PuzzleButtonGroup 
            puzzleWords={puzzleWords} 
            toggleWordByIndex={toggleWordByIndex}
        />
        </div>
    );
}

function toggleWord(word: string): string {
    if(!word){
        return ""
    };
    const wordNoHyphens = word.replaceAll('-', '')
    if(word.startsWith('-')){
        return wordNoHyphens;
    }else{
        return '-' + wordNoHyphens + '-';
    }
}

export function wordWithoutHyphens(word: string): string {
    return word.replaceAll('-', '')
}