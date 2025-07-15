import { Button, styled, type ButtonProps } from "@mui/material";
import { wordWithoutHyphens } from "./puzzleInterface";
import { grey } from "@mui/material/colors";

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
            const StyledButton = word.startsWith('-') ? 
            styled(Button)<ButtonProps>( ({theme}) => ({
                color: theme.palette.getContrastText(grey[900]),
                backgroundColor: grey[900]
            })) : 
            styled(Button)<ButtonProps>( ({theme}) => ({
                color: theme.palette.getContrastText(grey[100]),
                backgroundColor: grey[100]
            }));

            return (
            <StyledButton 
                key={"button_" + index} 
                onClick={() => props.onClickAction(index)}
            >
                {wordWithoutHyphens(word)}
            </StyledButton>
        ) }
    );
        
    return puzzleButtons;
}