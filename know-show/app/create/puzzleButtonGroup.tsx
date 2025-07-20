import { Button, styled, type ButtonProps } from "@mui/material";
import { getBaseWord } from "~/util/modifyWord";
import { grey } from "@mui/material/colors";
import { MARK_HIDDEN, MARK_REVEALED } from "~/constants";

interface PuzzleButtonGroupProps {
    buttonWords : string[]; //word object to display in the button group
    onClickAction: (index: number) => void; //action to assign to the buttons
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
            const StyledButton = makeStyledButtonForFirstCharacter(firstCharacter);

            return (
            <StyledButton 
                key={"button_" + index} 
                onClick={() => props.onClickAction(index)}
            >
                {getBaseWord(word)}
            </StyledButton>
        ) }
    );
        
    return puzzleButtons;
}

function makeStyledButtonForFirstCharacter(firstCharacter: string){
    if(firstCharacter === MARK_HIDDEN){
        return styled(Button)<ButtonProps>( (
            {theme}) => ({
                color: theme.palette.getContrastText(grey[900]),
                backgroundColor: grey[900]
            })
        );
    } else if(firstCharacter === MARK_REVEALED){ //unused
        return styled(Button)<ButtonProps>( (
            {theme}) => ({
                color: theme.palette.getContrastText(grey[400]),
                backgroundColor: grey[400]
            })
        );
    } else{
        return styled(Button)<ButtonProps>( (
            {theme}) => ({
                color: theme.palette.getContrastText(grey[100]),
                backgroundColor: grey[100]
            })
        );
    }
}