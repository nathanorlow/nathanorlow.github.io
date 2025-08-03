import { HIDDEN_SX, SHOWN_SX, VISIBLE_SX } from "~/common/puzzleButtonGroup";
import { MARK_HIDDEN, MARK_SHOWN } from "~/constants";
import { getBaseWord } from "./modifyWord";

enum Status {
    Visible,
    Hidden,
    Shown
}

export class PuzzleSection {
    section: string;
    status: Status;

    constructor(section: string, status: Status){
        this.section = section;
        this.status = status; 
    }

    public toPlainString(): string {
        return this.section;
    }

    public static fromFormattedString(inputString: string): PuzzleSection{
        const baseWord: string = getBaseWord(inputString);
        if(inputString.startsWith(MARK_HIDDEN)){
            return new PuzzleSection(baseWord, Status.Hidden);
        }else if(inputString.startsWith(MARK_SHOWN)){
            return new PuzzleSection(baseWord, Status.Shown);
        }else {
            return new PuzzleSection(baseWord, Status.Visible);
        }
    }

    public toFormattedString(): string {
        if (this.status == Status.Hidden) {
            return MARK_HIDDEN + this.section + MARK_HIDDEN;
        } else if (this.status == Status.Shown) {
            return MARK_SHOWN + this.section + MARK_SHOWN;
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