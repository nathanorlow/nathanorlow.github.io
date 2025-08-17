import { HIDDEN_SX, SHOWN_SX, VISIBLE_SX } from "~/common/puzzleButtonGroup";
import { MARK_HIDDEN, MARK_SHOWN } from "~/constants";
import { getPlainSection } from "./modifyWord";

enum Status {
    Visible,
    Hidden,
    Shown
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

    public static fromFormattedString(inputString: string): PuzzleSection{
        const plainSection: ISectionTrailing = getPlainSection(inputString);
        if(inputString.startsWith(MARK_HIDDEN)){
            return new PuzzleSection(plainSection.section, plainSection.trailing, Status.Hidden);
        }else if(inputString.startsWith(MARK_SHOWN)){
            return new PuzzleSection(plainSection.section, plainSection.trailing, Status.Shown);
        }else {
            return new PuzzleSection(plainSection.section, plainSection.trailing, Status.Visible);
        }
    }

    public toFormattedString(): string {
        if (this.status == Status.Hidden) {
            return MARK_HIDDEN + this.section + this.trailing + MARK_HIDDEN;
        } else if (this.status == Status.Shown) {
            return MARK_SHOWN + this.section + this.trailing + MARK_SHOWN;
        } else {
            return this.section
        }
    }

    public toggleHiddenStatus() {
        if(this.status == Status.Hidden) {
            this.status = Status.Visible;
        }else {
            this.status = Status.Hidden;
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
        }else{
            return VISIBLE_SX
        }
    }
}