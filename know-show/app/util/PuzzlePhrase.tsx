import { WORD_DELIMITER } from "~/constants";
import { PuzzleSection } from "./PuzzleSection"

export class PuzzlePhrase {
    sections : PuzzleSection[];

    constructor(sections: PuzzleSection[]){
        this.sections = sections;
    }

    public toFormattedPromptString():string {
        return this.sections.map(
            (section: PuzzleSection) => section.toFormattedString()
        ).join(WORD_DELIMITER);
    }

    public static fromFormattedPromptString(inputString: string): PuzzlePhrase{
        const sections: PuzzleSection[] =
            inputString.split(WORD_DELIMITER).map(
                (stringSection) => PuzzleSection.fromFormattedString(stringSection)
            );
        return new PuzzlePhrase(sections);
    }

    public withToggledButton(toggleIndex:number): PuzzlePhrase{
        this.sections[toggleIndex].toggleHiddenStatus();
        return new PuzzlePhrase(this.sections);
    }
}