import { Button, styled, type ButtonProps } from "@mui/material";
import { getBaseWord } from "~/util/modifyWord";
import { green, grey } from "@mui/material/colors";
import { MARK_HIDDEN, MARK_SHOWN } from "~/constants";

//This is a more general button group
//it displays a series of strings on buttons
//the button style depends on the text
interface PuzzleButtonGroupProps {
    //TODO: maybe pass in the word/sx array
    buttonWords : string[]; //word object to display in the button group
    onClickAction: (index: number) => void; //action to assign to the buttons
    makeStyledButtonForString: (inputString: string) => any;
}

export function PuzzleButtonGroup(props : PuzzleButtonGroupProps){
    const puzzleWords : string[] = props.buttonWords;
    if(!puzzleWords){
        return(<div></div>);
    }

    const puzzleButtons = puzzleWords.map(
        (word, index) =>
        { 
            const firstCharacter = word.substring(0,1);
            //const StyledButton = props.makeStyledButtonForString(firstCharacter);

            const buttonSx = props.makeStyledButtonForString(firstCharacter);
            return (
            <Button 
                key={"button_" + index} 
                onClick={() => props.onClickAction(index)}
                sx={buttonSx}
            >
                {getBaseWord(word)}
            </Button>)

            /*
            return (
            <StyledButton 
                key={"button_" + index} 
                onClick={() => props.onClickAction(index)}
            >
                {getBaseWord(word)}
            </StyledButton>)*/

        }
    );
        
    return puzzleButtons;
}

export function makeSolveButtonSX(firstCharacter: string){
    //p = padding
    if(firstCharacter === MARK_HIDDEN){
        return {bgcolor: 'black', width: 'fit-content', minwidth: 0}
    } else if(firstCharacter === MARK_SHOWN){
        return {bgcolor: 'grey', width: 'fit-content', minWidth: 0}
    }else{
        return {bgcolor: 'white', width: 'fit-content', minWidth: 0}
    }
}

export function makeShowButtonSX(firstCharacter: string){
    //p = padding
    if(firstCharacter === MARK_HIDDEN){
        return {bgcolor: 'black', width: 'fit-content', minwidth: 0}
    } else if(firstCharacter === MARK_SHOWN){
        return {bgcolor: 'grey', width: 'fit-content', minWidth: 0}
    }else{
        return {bgcolor: 'white', width: 'fit-content', minWidth: 0}
    }
}

export function makeSolveButtonForFirstCharacter(firstCharacter: string){
    if(firstCharacter === MARK_HIDDEN){
        return styled(Button)<ButtonProps>(
            ({theme}) => ({
                color: grey[900],
                backgroundColor: grey[900]
            })
        );
    } else if(firstCharacter === MARK_SHOWN){
        return styled(Button)<ButtonProps>( 
            ({theme}) => ({
                color: theme.palette.getContrastText(grey[400]),
                backgroundColor: grey[400]
            })
        );
    } else{
        return styled(Button)<ButtonProps>(
            ({theme}) => ({
                color: theme.palette.getContrastText(grey[100]),
                backgroundColor: grey[100]
            })
        );
    }
}

export function makeShowButtonForFirstCharacter(firstCharacter: string) {
    if (firstCharacter === MARK_HIDDEN) {        
        return styled(Button)<ButtonProps>((
            { theme }) => ({
                color: theme.palette.getContrastText(green[700]),
                backgroundColor: green[700]
            })
        );
    } else if (firstCharacter === MARK_SHOWN) { //unused
        return styled(Button)<ButtonProps>((
            { theme }) => ({
                color: theme.palette.getContrastText(grey[400]),
                backgroundColor: grey[400]
            })
        );
    } else {
        return styled(Button)<ButtonProps>((
            { theme }) => ({
                color: theme.palette.getContrastText(grey[100]),
                backgroundColor: grey[100]
            })
        );
    }
}