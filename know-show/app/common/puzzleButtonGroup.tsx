import { Button } from "@mui/material";
//import { green, grey } from "@mui/material/colors";
import { MARK_HIDDEN, MARK_SHOWN } from "~/constants";
import type { PuzzlePhrase } from "~/util/PuzzlePhrase";

//This is a more general button group
//it displays a series of strings on buttons
//the button style depends on the text

//margin -1 is ok with letters but not sections
const BUTTON_DEFAULTS_SX = {fontSize: 20, width: 'fit-content', minWidth: 0, color: 'black'};

export const HIDDEN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "black"};
export const SHOWN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "lightgray"};
export const VISIBLE_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "white"};

export interface PuzzleButtonGroupConfig {
    puzzlePhrase : PuzzlePhrase; //word object to display in the button group (with delimiter)
    onClickAction: (index: number) => void; //action to assign to the buttons
}

export function createButtonsFromPhrase(config: PuzzleButtonGroupConfig) : React.ReactElement[] {
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