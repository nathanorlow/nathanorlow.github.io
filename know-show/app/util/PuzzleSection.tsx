import { BLOCKED_SX, HIDDEN_SX, SHOWN_SX, VISIBLE_SX } from "~/common/puzzleButtonGroup";
import { MARK_BLOCKED, MARK_HIDDEN, MARK_SHOWN } from "~/constants";
import { getPlainSection } from "./modifyWord";
import { Mode } from "~/create/mode/ModeButton";

enum Status {
    Visible,
    Hidden,
    Shown,
    Blocked
}

const DEFAULT_STATUS = Status.Hidden; // maybe could be visible too

namespace Status {
    export function fromMode(mode: Mode): Status{
        if(mode === Mode.Blocked){
            return Status.Blocked;
        } else { // does not correspond to a mode
            return DEFAULT_STATUS;
        }
    }
}

export interface ISectionTrailing {
    section: string;
    trailing: string;
}

export class PuzzleSection {
    section: string;
    trailing: string;
    status: Status;

    constructor(section: string, trailing: string, status: Status){
        this.section = section;
        this.trailing = trailing;
        this.status = status; 
    }

    public toPlainString(): string {
        return this.section + this.trailing;
    }

    public toSectionTrailing(): ISectionTrailing {
        return {section: this.section, trailing: this.trailing};
    }

    public isShown(): boolean {
        return this.status === Status.Shown;
    }

    public static fromFormattedString(inputString: string): PuzzleSection{
        const plainSection: ISectionTrailing = getPlainSection(inputString);
        if(inputString.startsWith(MARK_HIDDEN)){
            return PuzzleSection.fromFormattedStringWithStatus(inputString, Status.Hidden);
        }else if(inputString.startsWith(MARK_SHOWN)){
            return PuzzleSection.fromFormattedStringWithStatus(inputString, Status.Shown);
        }else if(inputString.startsWith(MARK_BLOCKED)){
            return PuzzleSection.fromFormattedStringWithStatus(inputString, Status.Blocked)
        }else {
            return PuzzleSection.fromFormattedStringWithStatus(inputString, Status.Visible);
        }
    }

    public static fromFormattedStringWithStatus(inputString: string, status: Status): PuzzleSection{
        const plainSection: ISectionTrailing = getPlainSection(inputString);
        return new PuzzleSection(plainSection.section, plainSection.trailing, status);        
    }

    public toFormattedString(): string {
        if (this.status == Status.Hidden) {
            return this.toFormattedStringWithMark(MARK_HIDDEN);
        } else if (this.status == Status.Shown) {
            return this.toFormattedStringWithMark(MARK_SHOWN);
        } else if (this.status == Status.Blocked) {
            return this.toFormattedStringWithMark(MARK_BLOCKED);
        } else {
            return this.toFormattedStringWithMark('');
        }
    }

    public toFormattedStringWithMark(mark: string): string {
        return mark + this.section + this.trailing + mark;
    }

    public toggleHiddenStatus() {
        if(this.status === Status.Hidden) {
            this.status = Status.Visible;
        }else if(this.status === Status.Visible) {
            this.status = Status.Hidden;
        }
    }

    public toggleMode(newMode: Mode){
        const newStatus = Status.fromMode(newMode);
        if(this.status === newStatus){ // already this status, so toggle
            this.status = DEFAULT_STATUS;
        }else{
            this.status = newStatus;
        }
    }

    public showIfHidden(){
        if(this.status == Status.Hidden) {
            this.status = Status.Shown;
        }
    }

    public toButtonSX(){
        if(this.status == Status.Hidden){
            return HIDDEN_SX
        } else if(this.status == Status.Shown){
            return SHOWN_SX
        }else if(this.status == Status.Blocked){
            return BLOCKED_SX
        }else{
            return VISIBLE_SX
        }
    }
}