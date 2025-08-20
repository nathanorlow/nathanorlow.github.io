import { Mode, ModeButton } from "./ModeButton";

export interface ModeInterfaceProps{
    currentMode: Mode;
    setCurrentMode: (mode: Mode) => void;
}


export function ModeInterface(props: ModeInterfaceProps){
    const {currentMode, setCurrentMode} = props;
    return (
        <div className="buttonContainer">
            <ModeButton
                thisButtonMode={Mode.Blocked}
                currentMode={currentMode}
                setCurrentMode={setCurrentMode}
                backgroundColor="lightgreen"
            />
        </div>
    );
}