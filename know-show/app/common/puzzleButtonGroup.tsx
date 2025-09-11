import { Button } from "@mui/material";
//import { green, grey } from "@mui/material/colors";
import { MARK_HIDDEN, MARK_SHOWN } from "~/constants";
import { Mode } from "~/create/mode/ModeButton";
import type { PuzzlePhrase } from "~/util/PuzzlePhrase";

//This is a more general button group
//it displays a series of strings on buttons
//the button style depends on the text

//margin -1 is ok with letters but not sections
export const VERY_DARK_GREEN = "#003000";
const VERY_LIGHT_GREEN = "#D0F0D0";
const BUTTON_DEFAULTS_SX = {fontSize: 20, width: 'fit-content', minWidth: 0, color: VERY_DARK_GREEN};
export const HIDDEN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: VERY_DARK_GREEN};
export const SHOWN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: VERY_LIGHT_GREEN};
export const VISIBLE_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "lightgray"};
export const BLOCKED_SX = {...BUTTON_DEFAULTS_SX, 
    bgcolor: Mode.associatedColor(Mode.Blocked), 
    color: Mode.associatedColor(Mode.Blocked)};

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
            const {section, trailing} = wordSection.toSectionTrailing();
            const sectionButton = (                
                <Button 
                    key={"button_" + index} 
                    onClick={() => onClickAction(index)}
                    sx={buttonSx}
                >
                    {section}
                </Button> 
            );
            const trailingButton = (
                <Button
                    key={"trailing_" + index}
                    sx={VISIBLE_SX}
                >
                    {trailing}
                </Button>
            )

            return (
            <div className="buttonContainer" key={"button_container_" + index}>
                {sectionButton}
                {trailing ? trailingButton : ""}
            </div>)
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