import { MARK_HIDDEN, MARK_SHOWN, VALID_CHARACTER_REGEX } from "~/constants";
import type { ISectionTrailing } from "./PuzzleSection";

export function toggleWordHiddenFormat(word: string): string {
    if (word.startsWith(MARK_HIDDEN)) {
        return getBaseWord(word);
    } else {
        return MARK_HIDDEN + getBaseWord(word) + MARK_HIDDEN;
    }
}

export function toHiddenUnlessSpace(word: string): string {
    if (!word) {
        return "";
    } else if (word === " "){
        return " ";
    } else {
        return MARK_HIDDEN + word + MARK_HIDDEN;
    }
}

export function toRevealedWordIfHidden(word: string): string {
    if (!word) {
        return "";
    };
    if (word.startsWith(MARK_HIDDEN)) {
        const returnWord = MARK_SHOWN + getBaseWord(word) + MARK_SHOWN;
        return returnWord;
    } else {
        return word;
    }
}
export function getBaseWord(word: string): string {
    let baseWord = word;
    baseWord = baseWord.replaceAll(MARK_HIDDEN, '');
    baseWord = baseWord.replaceAll(MARK_SHOWN, '');
    return baseWord;
}

export function getPlainSection(inputSection: string): ISectionTrailing {
    const baseWord = getBaseWord(inputSection);
    const matches: string[] | null = baseWord.match("([.,?!]*)$");
    if(matches == null){
        return {section: baseWord, trailing: ""};
    }
    const plainSection: string = baseWord.slice(0, baseWord.length - matches[1].length);
    const trailing: string = matches[1];
    if(matches[1]){
        console.log("Output base " + plainSection );
        console.log("Output trailing " + trailing );
    }
    return {section: plainSection, trailing};
}

export function normalizeString(input: string): string {
    const baseWord = input.trim().toLowerCase();
    const baseLetters: string[] = baseWord.match(VALID_CHARACTER_REGEX) ?? [];
    return baseLetters.join();
}

export interface ModifyWordInStringInputs {
    inputString:string,
    delimiter:string,
    desiredIndex: number,
    modifyFunction: (inputString: string) => string
}

//Modify a single word at a particular index in a delimited string
export function modifyWordAtIndexInString(inputs: ModifyWordInStringInputs){
    const {inputString: inputPuzzleString, delimiter, desiredIndex, modifyFunction} = inputs;
    const oldWords: string[] = (inputPuzzleString.split(delimiter));
    const newWords = oldWords.map(
        (word:string, index:number) => index === desiredIndex ? modifyFunction(word) : word
    );
    return newWords.join(delimiter);
}