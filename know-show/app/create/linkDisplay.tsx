import { RedirectButton } from "~/util/RedirectButton";
import { ROWS_FOR_TEXT_AREA } from "./create";

interface LinkDisplayProps {
    buttonText: string; //label to display
    link: string; //String to display
}

export function LinkDisplay(props : LinkDisplayProps){
    const {buttonText, link} = props;
    return(
        <div className="linkDisplay">
            <RedirectButton buttonText={buttonText} buttonLink={link} />
            {/*<textarea
                className="linkText"
                readOnly
                value={linkText}
                rows={ROWS_FOR_TEXT_AREA}
            />*/}
        </div>
    );
}

export function encodeLink(inputString: string): string {
    const sanitizedString = inputString;
    const encodedLinkStringWithEquals = btoa(sanitizedString); //base 64 encode
    const encodedLinkString = encodedLinkStringWithEquals.replaceAll("=",""); //base 64 encode
    return encodedLinkString;
}
