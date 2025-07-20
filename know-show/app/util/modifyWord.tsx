import { MARK_HIDDEN, MARK_REVEALED } from "~/constants";

export function toggleWordHiddenFormat(word: string): string {
    if (!word) {
        return "";
    };

    if (word.startsWith(MARK_HIDDEN)) {
        return getBaseWord(word);
    } else {
        return MARK_HIDDEN + getBaseWord(word) + MARK_HIDDEN;
    }
}

export function toRevealedWordIfHidden(word: string): string {
    if (!word) {
        return "";
    };
    if (word.startsWith(MARK_HIDDEN)) {
        const returnWord = MARK_REVEALED + getBaseWord(word) + MARK_REVEALED;
        return returnWord;
    } else {
        return word;
    }
}
export function getBaseWord(word: string): string {
    let baseWord = word;
    baseWord = baseWord.replaceAll(MARK_HIDDEN, '');
    baseWord = baseWord.replaceAll(MARK_REVEALED, '');
    return baseWord;
}

