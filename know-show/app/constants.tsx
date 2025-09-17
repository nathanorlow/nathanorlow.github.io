export const WORD_DELIMITER = " ";
export const WORD_DELIMITER_REGEX = /\s+/;
export const COMPONENT_DELIMITER = "|";
export const MARK_HIDDEN = '#';
export const MARK_SHOWN = '~';
export const MARK_BLOCKED = '$';
export const IS_MARK_REGEX = /#|~|\$/g;
// These should also include the marks above as necessary
export const VALID_ANSWER_CHARACTER_REGEX = /[-a-zA-Z ]/g;
export const VALID_PROMPT_CHARACTER_REGEX = /[-a-zA-Z,.?!\s#~$\n]/g
export const TRAILING_CAPTURE_REGEX = /([.,?!]*)$/