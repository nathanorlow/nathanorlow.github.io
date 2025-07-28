import { ROWS_FOR_TEXT_AREA } from "./create";

interface LinkDisplayProps {
    labelText: string; //label to display
    linkText: string; //String to display
}

export function LinkDisplay(props : LinkDisplayProps){
    return(
        <div>
            <label className="labelText">{props.labelText}</label>
            <textarea
                className="linkText"
                readOnly
                value={props.linkText}
                rows={ROWS_FOR_TEXT_AREA}
            />
        </div>
    );
}

export function encodeLink(inputString: string): string {
    const sanitizedString = inputString;
    const encodedLinkStringWithEquals = btoa(sanitizedString); //base 64 encode
    const encodedLinkString = encodedLinkStringWithEquals.replaceAll("=",""); //base 64 encode
    return encodedLinkString;
}
