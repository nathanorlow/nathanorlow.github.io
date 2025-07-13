interface LinkDisplayProps {
    encodedLinkString : any;
    rowsForTextArea: number;
}

export function LinkDisplay(props : LinkDisplayProps){
    return(
        <div>
        <label className="largeText">A link to this puzzle is</label>
        <br />
        <textarea
        readOnly
        value={props.encodedLinkString}
        rows={props.rowsForTextArea}
        />
        </div>
    );
}