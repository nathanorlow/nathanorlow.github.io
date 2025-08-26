import { COMPONENT_DELIMITER, WORD_DELIMITER } from "~/constants";
import { PuzzleSection } from "./PuzzleSection"
import { createButtonsFromPhrase } from "~/common/puzzleButtonGroup";
import type { ActionOnIndex } from "~/solve/solveInterface";
import type { Mode } from "~/create/mode/ModeButton";

export class PuzzlePhrase {
    sections : PuzzleSection[];

    constructor(sections: PuzzleSection[]){
        this.sections = sections;
    }

    public toFormattedPromptString(): string {
        return this.sections.map(
            (section: PuzzleSection) => section.toFormattedString()
        ).join(WORD_DELIMITER);
    }

    public toFormattedAnswerString(): string {
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

    public static fromFormattedAnswerString(inputString: string): PuzzlePhrase{
        const sections: PuzzleSection[] =
            inputString.split(COMPONENT_DELIMITER).map(
                (stringSection) => PuzzleSection.fromFormattedString(stringSection)
            );
        return new PuzzlePhrase(sections);
    }


    public withSectionToggled(toggleIndex:number): PuzzlePhrase{
        this.sections[toggleIndex].toggleHiddenStatus();
        return new PuzzlePhrase(this.sections);
    }

    public withSectionModeSet(toggleIndex:number, newMode: Mode): PuzzlePhrase{
        this.sections[toggleIndex].toggleMode(newMode);
        return new PuzzlePhrase(this.sections);
    }

    public withSectionShownIfHidden(toggleIndex:number): PuzzlePhrase{
        this.sections[toggleIndex].showIfHidden();
        return new PuzzlePhrase(this.sections);
    }

    public countShown(): number {
        const shownCount = this.sections.filter((section) => section.isShown()).length;
        return shownCount;
    }

    public createButtonsWithActionOnIndex = (actionOnIndex: ActionOnIndex): React.ReactElement[] => {
        return createButtonsFromPhrase({
            puzzlePhrase: this,
            onClickAction: actionOnIndex
        });
    }    
}