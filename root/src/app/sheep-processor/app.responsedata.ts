import { ResponseLine } from "./app.responseline";
import {Question} from "./app.question";
import { RoundEndScoreGroup } from "./app.roundendscoregroup";
import { ResponseError } from "./app.responseerror";

export class ResponseData {

    questions: Question[] = [];
    responseLines: ResponseLine[] = [];
    
    constructor(classInput: String) {
      var inputLines = classInput.split(/\r?\n/);
      var firstInputLine = inputLines?.shift();  // default to [] if undefined

      this.questions = Question.questionsFromInputLine(firstInputLine);
      this.responseLines = ResponseLine.responseLinesFromInputLines(inputLines, 2); //here first line num is 2
    }

    //Index is 0 based
    public processAllLines(requestedQuestionIndex: number): String{
        var errorOutput : string = "";
        var textBoxPost = "";

        if( (requestedQuestionIndex >= 0 && requestedQuestionIndex <= this.questions.length -1) == false){
            textBoxPost += "Enter question number from 1 to " + this.questions.length;
            return textBoxPost;
        }

        try{
            this.updateQuestionsWithResponseLineArray();
        }catch(error){
            if(error instanceof ResponseError){
                textBoxPost += "Errors:\n" + errorOutput + "\n---\n";
            }else{
                textBoxPost += "Unknown error happened\n -- \n";
            }
        }

        console.log("Displaying question " + (requestedQuestionIndex + 1) + " of " + this.questions.length);
        textBoxPost += this.questions[requestedQuestionIndex].asPost();
        return textBoxPost;
    }


    private updateQuestionsWithResponseLineArray(){
        var errorString = "";
        var savedRoundEndScoreGroup = new RoundEndScoreGroup;
        for (let question of this.questions) {
            try{
                question.updateWithResponseLineArray(this.responseLines);
            }catch(error){
                if(error instanceof ResponseError){
                    errorString += error.message;
                }else{
                    throw error;
                }
            }
            //now tabulate score
            question.roundEndScoreGroup = RoundEndScoreGroup.fromPreviousQuestion(savedRoundEndScoreGroup, question.responseToChoosers);
            //and keep track of the score to use for the next question
            savedRoundEndScoreGroup = question.roundEndScoreGroup;
        };
        if(errorString != ""){
            throw new ResponseError(errorString);
        }
    }

    public asInputLinesString(newDelimiter : string) : String{
        var inputLinesString : string = "Updated";
        for(let question of this.questions){
            inputLinesString += newDelimiter + question.questionText;
        }
        for(let responseLine of this.responseLines){
            inputLinesString += "\n" + responseLine.player 
            for(let response of responseLine.responses){
                inputLinesString += newDelimiter + response;
            }
        }
        return inputLinesString;
    }

    //note questionNumber starts at 1
    public getResponsesOrEmptyForQuestion(questionNumber: number ): string[]{
        const responsesForQuestion : string[] = [];
        if(this.responseLines == undefined){
            return [];
        } 
        for(let responseLine of this.responseLines){
            responsesForQuestion.push(responseLine.responses[questionNumber - 1]);
        }
        return responsesForQuestion;
    }
}


