import { Button } from "@mui/material";
//import { green, grey } from "@mui/material/colors";
import { MARK_HIDDEN, MARK_SHOWN } from "~/constants";
import type { PuzzlePhrase } from "~/util/PuzzlePhrase";

//This is a more general button group
//it displays a series of strings on buttons
//the button style depends on the text

const BUTTON_DEFAULTS_SX = {fontSize: 20, width: 'fit-content', minwidth: 0, padding: 1, margin: 1};

export const HIDDEN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "black"};
export const SHOWN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "grey"};
export const VISIBLE_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "white"};

interface PuzzleButtonGroupProps {
    buttonArray : any[];
}

export interface PuzzleButtonGroupConfig {
    puzzlePhrase : PuzzlePhrase; //word object to display in the button group (with delimiter)
    onClickAction: (index: number) => void; //action to assign to the buttons
}

export function PuzzleButtonGroup(props : PuzzleButtonGroupProps){
    return (props.buttonArray);
}

export function createButtonsFromConfig(config: PuzzleButtonGroupConfig) : React.ReactElement[] {
    const {puzzlePhrase, onClickAction} = config;

    const createdButtons = puzzlePhrase.sections.map(
        (wordSection, index) =>
        { 
            const buttonSx = wordSection.toButtonSX();
            return (
            <Button 
                key={"button_" + index} 
                onClick={() => onClickAction(index)}
                sx={buttonSx}
            >
                {wordSection.toPlainString()}
            </Button>)
        }
    );
    return createdButtons;
};

//Deprecated
export function makeSolveButtonSX(firstCharacter: string){
    //p = padding
    if(firstCharacter === MARK_HIDDEN){
        return HIDDEN_SX
    } else if(firstCharacter === MARK_SHOWN){
        return SHOWN_SX
    }else{
        return VISIBLE_SX
    }
}

//Deprecated
export function makeShowButtonSX(firstCharacter: string){
    //p = padding
    if(firstCharacter === MARK_HIDDEN){
        return HIDDEN_SX
    } else if(firstCharacter === MARK_SHOWN){
        return SHOWN_SX
    }else{
        return VISIBLE_SX
    }
}