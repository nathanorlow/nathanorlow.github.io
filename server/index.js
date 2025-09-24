var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useNavigate, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { Button as Button$1 } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const WORD_DELIMITER = " ";
const WORD_DELIMITER_REGEX = /\s+/;
const COMPONENT_DELIMITER = "|";
const MARK_HIDDEN = "#";
const MARK_SHOWN = "~";
const MARK_BLOCKED = "$";
const IS_MARK_REGEX = /#|~|\$/g;
const VALID_ANSWER_CHARACTER_REGEX = /[-a-zA-Z ]/g;
const VALID_PROMPT_CHARACTER_REGEX = /[-a-zA-Z,.?!\s#~$\n]/g;
const TRAILING_CAPTURE_REGEX = /([.,?!]*)$/;
function toggleWordHiddenFormat(word) {
  if (word.startsWith(MARK_HIDDEN)) {
    return getBaseWord(word);
  } else {
    return MARK_HIDDEN + getBaseWord(word) + MARK_HIDDEN;
  }
}
function getBaseWord(word) {
  let baseWord = word;
  baseWord = baseWord.replaceAll(IS_MARK_REGEX, "");
  return baseWord;
}
function getPlainSection(inputSection) {
  const baseWord = getBaseWord(inputSection);
  const matches = baseWord.match(TRAILING_CAPTURE_REGEX);
  if (matches == null) {
    return { section: baseWord, trailing: "" };
  }
  const plainSection = baseWord.slice(0, baseWord.length - matches[1].length);
  const trailing = matches[1];
  return { section: plainSection, trailing };
}
function retainCharacters(inputString, validCharacterRegex) {
  const validLetters = inputString.match(validCharacterRegex) ?? [];
  return validLetters.join("");
}
function normalizeString(inputString, validCharacterRegex) {
  const baseWord = inputString.trim().toUpperCase();
  return retainCharacters(baseWord, validCharacterRegex);
}
var Mode = /* @__PURE__ */ ((Mode2) => {
  Mode2[Mode2["None"] = 0] = "None";
  Mode2[Mode2["Blocked"] = 1] = "Blocked";
  return Mode2;
})(Mode || {});
const BLOCKED_COLOR = "lightgreen";
const DEFAULT_COLOR = "white";
const MODE_BUTTON_DEFAULT_SX = { fontWeight: "bold" };
((Mode2) => {
  function associatedColor(mode) {
    if (mode === 1) {
      return BLOCKED_COLOR;
    }
    return DEFAULT_COLOR;
  }
  Mode2.associatedColor = associatedColor;
})(Mode || (Mode = {}));
const DEFAULT_MODE = 0;
const isDefaultMode = (mode) => {
  return mode === DEFAULT_MODE;
};
function ModeButton(props) {
  const { thisButtonMode, currentMode, setCurrentMode } = props;
  const backgroundColor = Mode.associatedColor(thisButtonMode);
  const buttonSX = { ...MODE_BUTTON_DEFAULT_SX, bgcolor: backgroundColor };
  const toggleThisButtonMode = () => {
    if (currentMode == thisButtonMode) {
      setCurrentMode(DEFAULT_MODE);
    } else {
      setCurrentMode(thisButtonMode);
    }
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      className: "modeButton",
      onClick: toggleThisButtonMode,
      sx: buttonSX,
      children: "Blocked"
    }
  );
}
const VERY_DARK_GREEN = "#003000";
const VERY_LIGHT_GREEN = "#D0F0D0";
const BUTTON_DEFAULTS_SX$1 = { fontSize: 20, width: "fit-content", minWidth: 30, minHeight: 50, color: VERY_DARK_GREEN };
const HIDDEN_SX = { ...BUTTON_DEFAULTS_SX$1, bgcolor: VERY_DARK_GREEN };
const SHOWN_SX = { ...BUTTON_DEFAULTS_SX$1, bgcolor: VERY_LIGHT_GREEN };
const VISIBLE_SX = { ...BUTTON_DEFAULTS_SX$1, bgcolor: "lightgray" };
const BLOCKED_SX = {
  ...BUTTON_DEFAULTS_SX$1,
  bgcolor: Mode.associatedColor(Mode.Blocked),
  color: Mode.associatedColor(Mode.Blocked)
};
function createButtonsFromPhrase(config) {
  const { puzzlePhrase, onClickAction } = config;
  const createdButtons = puzzlePhrase.sections.map(
    (wordSection, index) => {
      const buttonSx = wordSection.toButtonSX();
      const { section, trailing } = wordSection.toSectionTrailing();
      const sectionButton = /* @__PURE__ */ jsx(
        Button$1,
        {
          onClick: () => onClickAction(index),
          sx: buttonSx,
          children: section === " " ? " " : section
        },
        "button_" + index
      );
      const trailingButton = /* @__PURE__ */ jsx(
        Button$1,
        {
          sx: VISIBLE_SX,
          children: trailing
        },
        "trailing_" + index
      );
      return /* @__PURE__ */ jsxs("div", { className: "buttonContainer", children: [
        sectionButton,
        trailing ? trailingButton : ""
      ] }, "button_container_" + index);
    }
  );
  return createdButtons;
}
var Status = /* @__PURE__ */ ((Status2) => {
  Status2[Status2["Visible"] = 0] = "Visible";
  Status2[Status2["Hidden"] = 1] = "Hidden";
  Status2[Status2["Shown"] = 2] = "Shown";
  Status2[Status2["Blocked"] = 3] = "Blocked";
  return Status2;
})(Status || {});
const DEFAULT_STATUS = 1;
((Status2) => {
  function fromMode(mode) {
    if (mode === Mode.Blocked) {
      return 3;
    } else {
      return DEFAULT_STATUS;
    }
  }
  Status2.fromMode = fromMode;
})(Status || (Status = {}));
class PuzzleSection {
  constructor(section, trailing, status) {
    __publicField(this, "section");
    __publicField(this, "trailing");
    __publicField(this, "status");
    this.section = section;
    this.trailing = trailing;
    this.status = status;
  }
  toPlainString() {
    return this.section + this.trailing;
  }
  toSectionTrailing() {
    return { section: this.section, trailing: this.trailing };
  }
  isShown() {
    return this.status === 2;
  }
  static fromFormattedString(inputString) {
    if (inputString.startsWith(MARK_HIDDEN)) {
      return PuzzleSection.fromFormattedStringWithStatus(
        inputString,
        1
        /* Hidden */
      );
    } else if (inputString.startsWith(MARK_SHOWN)) {
      return PuzzleSection.fromFormattedStringWithStatus(
        inputString,
        2
        /* Shown */
      );
    } else if (inputString.startsWith(MARK_BLOCKED)) {
      return PuzzleSection.fromFormattedStringWithStatus(
        inputString,
        3
        /* Blocked */
      );
    } else {
      return PuzzleSection.fromFormattedStringWithStatus(
        inputString,
        0
        /* Visible */
      );
    }
  }
  static fromFormattedStringWithStatus(inputString, status) {
    const plainSection = getPlainSection(inputString);
    return new PuzzleSection(plainSection.section, plainSection.trailing, status);
  }
  toFormattedString() {
    if (this.status == 1) {
      return this.toFormattedStringWithMark(MARK_HIDDEN);
    } else if (this.status == 2) {
      return this.toFormattedStringWithMark(MARK_SHOWN);
    } else if (this.status == 3) {
      return this.toFormattedStringWithMark(MARK_BLOCKED);
    } else {
      return this.toFormattedStringWithMark("");
    }
  }
  toFormattedStringWithMark(mark) {
    return mark + this.section + this.trailing + mark;
  }
  toggleHiddenStatus() {
    if (this.status === 1) {
      this.status = 0;
    } else if (this.status === 0) {
      this.status = 1;
    }
  }
  toggleMode(newMode) {
    const newStatus = Status.fromMode(newMode);
    if (this.status === newStatus) {
      this.status = DEFAULT_STATUS;
    } else {
      this.status = newStatus;
    }
  }
  showIfHidden() {
    if (this.status == 1) {
      this.status = 2;
    }
  }
  showUnlessVisible() {
    if (this.status !== 0) {
      this.status = 2;
    }
  }
  toButtonSX() {
    if (this.status == 1) {
      return HIDDEN_SX;
    } else if (this.status == 2) {
      return SHOWN_SX;
    } else if (this.status == 3) {
      return BLOCKED_SX;
    } else {
      return VISIBLE_SX;
    }
  }
}
class PuzzlePhrase {
  constructor(sections) {
    __publicField(this, "sections");
    __publicField(this, "createButtonsWithActionOnIndex", (actionOnIndex) => {
      return createButtonsFromPhrase({
        puzzlePhrase: this,
        onClickAction: actionOnIndex
      });
    });
    this.sections = sections;
  }
  toFormattedPromptString() {
    return this.sections.map(
      (section) => section.toFormattedString()
    ).join(WORD_DELIMITER);
  }
  toFormattedAnswerString() {
    return this.sections.map(
      (section) => section.toFormattedString()
    ).join(WORD_DELIMITER);
  }
  static fromFormattedPromptString(inputString) {
    const sections = inputString.split(WORD_DELIMITER_REGEX).map(
      (stringSection) => PuzzleSection.fromFormattedString(stringSection)
    );
    return new PuzzlePhrase(sections);
  }
  static fromFormattedAnswerString(inputString) {
    const sections = inputString.split(COMPONENT_DELIMITER).map(
      (stringSection) => PuzzleSection.fromFormattedString(stringSection)
    );
    return new PuzzlePhrase(sections);
  }
  withSectionToggled(toggleIndex) {
    this.sections[toggleIndex].toggleHiddenStatus();
    return new PuzzlePhrase(this.sections);
  }
  withSectionModeSet(toggleIndex, newMode) {
    this.sections[toggleIndex].toggleMode(newMode);
    return new PuzzlePhrase(this.sections);
  }
  withSectionShownIfHidden(toggleIndex) {
    this.sections[toggleIndex].showIfHidden();
    return new PuzzlePhrase(this.sections);
  }
  withAllSectionsShown() {
    this.sections.forEach((section) => {
      section.showUnlessVisible();
    });
    return new PuzzlePhrase(this.sections);
  }
  countShown() {
    const shownCount = this.sections.filter((section) => section.isShown()).length;
    return shownCount;
  }
}
function CreateInterface(props) {
  const handlePuzzleAnswerChange = (changeEvent) => {
    const rawNewPuzzleAnswer = changeEvent.target.value;
    const newPuzzleAnswer = retainCharacters(rawNewPuzzleAnswer, VALID_ANSWER_CHARACTER_REGEX);
    props.savePuzzleAnswer(newPuzzleAnswer);
  };
  const handlePuzzlePromptChange = (changeEvent) => {
    const rawTextAreaString = changeEvent.target.value;
    const textAreaString = retainCharacters(rawTextAreaString, VALID_PROMPT_CHARACTER_REGEX);
    props.savePuzzlePhrase(PuzzlePhrase.fromFormattedPromptString(textAreaString));
  };
  const puzzlePrompt = props.puzzlePhrase.toFormattedPromptString();
  return /* @__PURE__ */ jsxs("div", { className: "createInterface", children: [
    /* @__PURE__ */ jsx("label", { className: "createLabelText", children: props.puzzleAnswerLabel }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        className: "puzzleAnswer",
        value: props.puzzleAnswer,
        onChange: handlePuzzleAnswerChange,
        rows: 1
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("label", { className: "createLabelText", children: props.puzzlePromptLabel }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        className: "puzzlePrompt",
        value: puzzlePrompt,
        onChange: handlePuzzlePromptChange,
        rows: ROWS_FOR_TEXT_AREA
      }
    )
  ] });
}
const BUTTON_DEFAULTS_SX = { fontSize: 24, width: "fit-content", minWidth: 0, color: "black", fontWeight: "bold" };
function RedirectButton(props) {
  const navigate = useNavigate();
  const { buttonText, buttonLink } = props;
  const handleClick = () => {
    navigate(buttonLink);
  };
  return /* @__PURE__ */ jsx("div", { className: "redirectButtonContainer", children: /* @__PURE__ */ jsx(Button$1, { onClick: handleClick, sx: BUTTON_DEFAULTS_SX, children: buttonText }) });
}
function LinkDisplay(props) {
  const { buttonText, link } = props;
  return /* @__PURE__ */ jsx("div", { className: "linkDisplay", children: /* @__PURE__ */ jsx(RedirectButton, { buttonText, buttonLink: link }) });
}
function encodeLink(inputString) {
  const sanitizedString = inputString;
  const encodedLinkStringWithEquals = btoa(sanitizedString);
  const encodedLinkString = encodedLinkStringWithEquals.replaceAll("=", "");
  return encodedLinkString;
}
function ButtonInterface(props) {
  const { currentMode } = props;
  const toggleSectionByIndex = (indexToUpdate) => {
    if (isDefaultMode(currentMode)) {
      props.savePuzzlePhrase(props.puzzlePhrase.withSectionToggled(indexToUpdate));
    } else {
      props.savePuzzlePhrase(props.puzzlePhrase.withSectionModeSet(indexToUpdate, currentMode));
    }
  };
  const puzzleButtons = props.puzzlePhrase.createButtonsWithActionOnIndex(toggleSectionByIndex);
  return /* @__PURE__ */ jsx("div", { className: "createButtonInterface", children: puzzleButtons });
}
function ModeInterface(props) {
  const { currentMode, setCurrentMode } = props;
  return /* @__PURE__ */ jsx("div", { className: "modeButtonContainer", children: /* @__PURE__ */ jsx(
    ModeButton,
    {
      thisButtonMode: Mode.Blocked,
      currentMode,
      setCurrentMode
    }
  ) });
}
const ANSWER_HELP_TEXT = "(enter answer here)";
const DEFAULT_ENTERED_ANSWER = "";
function SolveSubmitForm(props) {
  const [enteredAnswer, setEnteredAnswer] = useState(DEFAULT_ENTERED_ANSWER);
  const { register, handleSubmit } = useForm();
  return /* @__PURE__ */ jsx("div", { className: "solveSubmitForm", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(props.onSubmitAnswer), children: [
    /* @__PURE__ */ jsx("label", { children: /* @__PURE__ */ jsx(
      "input",
      {
        ...register("answer"),
        type: "text",
        placeholder: ANSWER_HELP_TEXT,
        value: enteredAnswer,
        onChange: (changeEvent) => setEnteredAnswer(changeEvent.target.value),
        className: "solveFormTextEntry"
      }
    ) }),
    /* @__PURE__ */ jsx("button", { className: "solveFormSubmitButton", children: "Submit" })
  ] }) });
}
function SolvingDataDisplay(props) {
  return /* @__PURE__ */ jsxs("div", { className: "dataDisplay", children: [
    "Total reveals: ",
    props.revealCount,
    /* @__PURE__ */ jsx("br", {}),
    "Wrong guesses: ",
    props.wrongGuessCount
  ] });
}
function SolveInterface(props) {
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [puzzlePhrase, setPuzzlePhrase] = useState(
    PuzzlePhrase.fromFormattedPromptString(
      props.initialPuzzleString
    )
  );
  const [answerPhrase, setAnswerPhrase] = useState(
    PuzzlePhrase.fromFormattedAnswerString(
      makeInitialFormattedCorrectAnswer(props.puzzleCorrectAnswer)
    )
  );
  const [revealsAtSolve, setRevealsAtSolve] = useState(-1);
  const [isSolved, setIsSolved] = useState(false);
  const currentReveals = isSolved ? revealsAtSolve : answerPhrase.countShown() + puzzlePhrase.countShown();
  const onSubmitAnswer = (answerFormData) => {
    const rawSubmittedAnswer = answerFormData.answer;
    console.log(`raw answer |${rawSubmittedAnswer}|`);
    const normalizedAnswer = normalizeString(rawSubmittedAnswer, VALID_ANSWER_CHARACTER_REGEX);
    const normalizedCorrectAnswer = normalizeString(props.puzzleCorrectAnswer, VALID_ANSWER_CHARACTER_REGEX);
    if (normalizedCorrectAnswer === normalizedAnswer) {
      setRevealsAtSolve(currentReveals);
      setIsSolved(true);
      setPuzzlePhrase(puzzlePhrase.withAllSectionsShown());
      setAnswerPhrase(answerPhrase.withAllSectionsShown());
    } else {
      setWrongGuesses(wrongGuesses + 1);
      console.log(`submitted |${normalizedAnswer}| correct ${normalizedCorrectAnswer}`);
    }
    setSubmittedAnswer(normalizedAnswer);
  };
  const showSectionByIndex = (indexToUpdate) => {
    setPuzzlePhrase(puzzlePhrase.withSectionShownIfHidden(indexToUpdate));
  };
  const updateAnswerStringByIndex = (indexToUpdate) => {
    setAnswerPhrase(answerPhrase.withSectionShownIfHidden(indexToUpdate));
  };
  const answerButtons = answerPhrase.createButtonsWithActionOnIndex(updateAnswerStringByIndex);
  const puzzleButtons = puzzlePhrase.createButtonsWithActionOnIndex(showSectionByIndex);
  const doNothing = () => {
  };
  return /* @__PURE__ */ jsxs("div", { className: "solveInterface", children: [
    /* @__PURE__ */ jsx("div", { className: "answerButtonGroup", children: answerButtons }),
    /* @__PURE__ */ jsx(
      SolveSubmitForm,
      {
        onSubmitAnswer: isSolved ? doNothing : onSubmitAnswer
      }
    ),
    /* @__PURE__ */ jsx(
      SolvingDataDisplay,
      {
        revealCount: currentReveals,
        wrongGuessCount: wrongGuesses
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("div", { className: "promptButtonGroup", children: puzzleButtons })
  ] });
}
function makeInitialFormattedCorrectAnswer(correctAnswer) {
  if (!correctAnswer) {
    return "";
  }
  const letters = correctAnswer.split("");
  const blockedFirstLetter = MARK_BLOCKED + letters.shift() + MARK_BLOCKED;
  const hiddenWord = letters.map(toggleWordHiddenFormat).join(COMPONENT_DELIMITER);
  const returnValue = blockedFirstLetter + COMPONENT_DELIMITER + hiddenWord;
  return returnValue;
}
function getPuzzleComponentsFromString(encodedString) {
  if (encodedString == void 0) {
    return { initialPuzzleAnswer: "", initialPuzzlePrompt: "" };
  }
  const puzzleAnswerAndPrompt = atob(encodedString);
  const puzzleComponents = puzzleAnswerAndPrompt.split(COMPONENT_DELIMITER);
  return { initialPuzzleAnswer: puzzleComponents[0], initialPuzzlePrompt: puzzleComponents[1] };
}
function Solve() {
  const { encodedString } = useParams();
  if (encodedString == null) {
    return /* @__PURE__ */ jsx("a", { href: "/solve", children: "Use the Solve page to generate a link!" });
  }
  const { initialPuzzleAnswer, initialPuzzlePrompt } = getPuzzleComponentsFromString(encodedString);
  if (initialPuzzleAnswer == void 0 || initialPuzzlePrompt == void 0) {
    return /* @__PURE__ */ jsx("a", { href: "/solve", children: "Make sure to specify a puzzle and answer!" });
  }
  const createLink = "/create/" + encodedString;
  return /* @__PURE__ */ jsxs("div", { className: "solveLayout", children: [
    /* @__PURE__ */ jsx(
      SolveInterface,
      {
        puzzleCorrectAnswer: initialPuzzleAnswer,
        initialPuzzleString: initialPuzzlePrompt
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      LinkDisplay,
      {
        buttonText: "Click here to edit this prompt (can copy a link)",
        link: createLink
      }
    )
  ] });
}
const ROWS_FOR_TEXT_AREA = 4;
const DEFAULT_PUZZLE_ANSWER = "Puzzle Answer";
const DEFAULT_PUZZLE_PROMPT = "Put puzzle here and click words below to #hide# #words#";
function Create() {
  const { encodedString } = useParams();
  const { initialPuzzleAnswer, initialPuzzlePrompt } = getPuzzleComponentsFromString(encodedString);
  const [puzzleAnswer, setPuzzleAnswer] = useState(initialPuzzleAnswer ?? DEFAULT_PUZZLE_ANSWER);
  const initialPuzzlePhrase = PuzzlePhrase.fromFormattedPromptString(initialPuzzlePrompt ?? DEFAULT_PUZZLE_PROMPT);
  const [puzzlePhrase, setPuzzlePhrase] = useState(initialPuzzlePhrase);
  const [currentMode, setCurrentMode] = useState(Mode.None);
  const puzzlePrompt = puzzlePhrase.toFormattedPromptString();
  const answerAndPromptString = puzzleAnswer + COMPONENT_DELIMITER + puzzlePrompt;
  const encodedLinkString = encodeLink(answerAndPromptString);
  const solveLink = "/solve/" + encodedLinkString;
  const createLayoutClassName = currentMode == Mode.Blocked ? "createLayout blockedMode" : "createLayout noneMode";
  return /* @__PURE__ */ jsxs("div", { className: createLayoutClassName, children: [
    /* @__PURE__ */ jsx(
      CreateInterface,
      {
        puzzleAnswerLabel: "Enter Puzzle Answer",
        puzzleAnswer,
        savePuzzleAnswer: setPuzzleAnswer,
        puzzlePromptLabel: "Enter Puzzle Text",
        puzzlePhrase,
        savePuzzlePhrase: setPuzzlePhrase
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      ModeInterface,
      {
        currentMode,
        setCurrentMode
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      ButtonInterface,
      {
        puzzlePhrase,
        savePuzzlePhrase: setPuzzlePhrase,
        currentMode
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      LinkDisplay,
      {
        buttonText: "Click here to solve this prompt (can copy a link)",
        link: solveLink
      }
    )
  ] });
}
function meta$1({}) {
  return [{
    title: "Know Show Create"
  }, {
    name: "description",
    content: "Know Show Create page"
  }];
}
const create = UNSAFE_withComponentProps(function CreatePage() {
  return /* @__PURE__ */ jsx(Create, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: create,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Know Show Solve"
  }, {
    name: "description",
    content: "Know Show Solve page"
  }];
}
const solve = UNSAFE_withComponentProps(function CreatePage2() {
  return /* @__PURE__ */ jsx(Solve, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: solve,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-A5PwV-zx.js", "imports": ["/assets/chunk-QMGIS6GS-zVnfdR1W.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-f04d4hWs.js", "imports": ["/assets/chunk-QMGIS6GS-zVnfdR1W.js"], "css": ["/assets/root-B1IB_xFv.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/create": { "id": "routes/create", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/create-Bwm8w83d.js", "imports": ["/assets/chunk-QMGIS6GS-zVnfdR1W.js", "/assets/solve-BEluTV9Q.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "green-screen-create": { "id": "green-screen-create", "parentId": "root", "path": "create/:encodedString", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/create-Bwm8w83d.js", "imports": ["/assets/chunk-QMGIS6GS-zVnfdR1W.js", "/assets/solve-BEluTV9Q.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "green-screen-solve": { "id": "green-screen-solve", "parentId": "root", "path": "solve/:encodedString", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/solve-BkoVXBxZ.js", "imports": ["/assets/chunk-QMGIS6GS-zVnfdR1W.js", "/assets/solve-BEluTV9Q.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-a97ad6f0.js", "version": "a97ad6f0", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/create": {
    id: "routes/create",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "green-screen-create": {
    id: "green-screen-create",
    parentId: "root",
    path: "create/:encodedString",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "green-screen-solve": {
    id: "green-screen-solve",
    parentId: "root",
    path: "solve/:encodedString",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
