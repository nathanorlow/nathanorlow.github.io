import { Button } from "@mui/material";
import { getBaseWord } from "~/util/modifyWord";
//import { green, grey } from "@mui/material/colors";
import { MARK_HIDDEN, MARK_SHOWN } from "~/constants";

//This is a more general button group
//it displays a series of strings on buttons
//the button style depends on the text

const BUTTON_DEFAULTS_SX = {fontSize: 20, width: 'fit-content', minwidth: 0, padding: 1, margin: 1};

const HIDDEN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "black"};
const SHOWN_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "grey"};
const VISIBLE_SX = {...BUTTON_DEFAULTS_SX, bgcolor: "white"};

interface PuzzleButtonGroupProps {
    buttonArray : any[];
}

export interface PuzzleButtonGroupConfig {
    delimitedString : string; //word object to display in the button group (with delimiter)
    delimiter: string;
    onClickAction: (index: number) => void; //action to assign to the buttons
    makeStyledButtonForString: (inputString: string) => any;
}

export function PuzzleButtonGroup(props : PuzzleButtonGroupProps){
    return (props.buttonArray);
}

export function createButtonsFromConfig(config: PuzzleButtonGroupConfig) : React.ReactElement[] {
    const {delimitedString, delimiter, onClickAction, makeStyledButtonForString} = config;

    const buttonWords = delimitedString.split(delimiter);
    const createdButtons = buttonWords.map(
        (word, index) =>
        { 
            const firstCharacter = word.substring(0,1);
            const buttonSx = makeStyledButtonForString(firstCharacter);

            return (
            <Button 
                key={"button_" + index} 
                onClick={() => onClickAction(index)}
                sx={buttonSx}
            >
                {getBaseWord(word)}
            </Button>)
        }
    );
    return createdButtons;
};

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