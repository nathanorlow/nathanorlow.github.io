import Button from "@mui/material/Button";

export enum Mode {
    None,
    Blocked
}

export interface ModeButtonProps {
    thisButtonMode: Mode;
    currentMode: Mode; //create mode
    setCurrentMode: (mode: Mode) => void;
    backgroundColor: string; // such as 'rgba(0, 255, 0, 0.5)'
}

export function ModeButton(props: ModeButtonProps){
    const {thisButtonMode, currentMode, setCurrentMode, backgroundColor} = props;

    const buttonSX = {bgcolor: backgroundColor, fontWeight: 'bold'};

    const toggleThisButtonMode = (): void => {
        if(currentMode == thisButtonMode){
            console.log("Changing to none");
            setCurrentMode(Mode.None);
        }else{
            console.log("Changing to " + thisButtonMode);
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