import { ROWS_FOR_TEXT_AREA } from "./create";

interface LinkDisplayProps {
    labelText: string; //label to display
    linkText: string; //String to display
}

export function LinkDisplay(props : LinkDisplayProps){
    return(
        <div>
        <label className="largeText">{props.labelText}</label>
        <br />
        <textarea
            readOnly
            value={props.linkText}
            rows={ROWS_FOR_TEXT_AREA}
        />
        </div>
    );
}

export function encodeLink(inputString: string): string {
    return inputString.replaceAll(" ", "-");
}
