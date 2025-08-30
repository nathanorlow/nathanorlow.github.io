import Button from "@mui/material/Button";

export enum Mode {
    None,
    Blocked
}

const BLOCKED_COLOR = "lightgreen";
const DEFAULT_COLOR = "white";

const MODE_BUTTON_DEFAULT_SX = {fontWeight: 'bold'};


export namespace Mode {
    export function associatedColor(mode: Mode): string{
        if(mode === Mode.Blocked){
            return BLOCKED_COLOR;
        }
        return DEFAULT_COLOR;
    }
}

const DEFAULT_MODE = Mode.None;

export const isDefaultMode = (mode: Mode): boolean => {
    return (mode === DEFAULT_MODE);
};

export interface ModeButtonProps {
    thisButtonMode: Mode;
    currentMode: Mode; //create mode
    setCurrentMode: (mode: Mode) => void;
}

export function ModeButton(props: ModeButtonProps){
    const {thisButtonMode, currentMode, setCurrentMode} = props;
    const backgroundColor = Mode.associatedColor(thisButtonMode);

    const buttonSX = {...MODE_BUTTON_DEFAULT_SX, bgcolor: backgroundColor};

    const toggleThisButtonMode = (): void => {
        if(currentMode == thisButtonMode){
            setCurrentMode(DEFAULT_MODE);
        }else{
            setCurrentMode(thisButtonMode);
        }
    }

    return(
        <Button 
            className="modeButton" 
            onClick={toggleThisButtonMode}
            sx={buttonSX}>
                Blocked
        </Button>
    );
}