import { ResponseLine } from "./app.responseline";
import { RoundEndScoreGroup } from "./app.roundendscoregroup";
import { ResponseError } from "./app.responseerror";

export class Question{
    questionNum: number;
    questionText: String;
    responseToChoosers: Map<String,String[]>;
    roundEndScoreGroup: RoundEndScoreGroup;

    //Note questions typically start at 1
    constructor(questionNum: number, questionText: String){
        this.questionNum = questionNum;
        this.questionText = questionText.trim();
        this.responseToChoosers = new Map<String,String[]>();
        this.roundEndScoreGroup = new RoundEndScoreGroup();
    }

    static questionsFromInputLine(inputLine: String|undefined ) : Question[]{
        var questions : Question[] = [];
        var questionTexts = inputLine?.split(/,/) ?? []; // default to [] if undefined
        questionTexts.shift(); //questions start at column 1 (names are in column 0)
        for(let questionNum = 1; questionNum <= questionTexts.length; questionNum++){
            questions.push(new Question(questionNum, questionTexts[questionNum - 1]));
        }
        return questions;
    }

    updateWithResponseLineArray(responseLines: ResponseLine[]){
        var errorOutput = "";
        for(let lineNum = 0; lineNum < responseLines.length; lineNum++){
            try{
                this.updateWithResponseLine(responseLines[lineNum]);
            }catch(error){
                if(error instanceof ResponseError){
                    errorOutput+=error.message;
                }else{
                    throw error;
                }
            }
        }
        if(errorOutput != ""){
            throw new ResponseError(errorOutput);
        }
    }

    updateWithResponseLine(responseLine: ResponseLine){
        //Lookup the corresponding response from all responses
        var response: String | undefined = responseLine.responses[this.questionNum - 1]; 
        if(response == undefined){
            return; //nothing to add to score
        }
        if(responseLine.player == undefined){
            throw new Error("No player defined for question " + this.questionNum);
        }
        var newChoosers : String[] = this.responseToChoosers.get(response) ?? []; // use [] if empty
        newChoosers.push(responseLine.player);
        this.responseToChoosers.set(response,newChoosers); //in case it was just created
   }

   makeSortedResponseWithChoosersList() : ResponseWithChoosers[]{
        var responseWithChoosersList : ResponseWithChoosers[] = [];
        for(const [response, choosers] of this.responseToChoosers){
            responseWithChoosersList.push(new ResponseWithChoosers(response, choosers))
        }
        //reverse sort
        responseWithChoosersList.sort(
            (a,b) => { return (b.choosers.length - a.choosers.length)}
        );
        return responseWithChoosersList;
   }

   asPost(): String{
        //creates a post string for the question listed
        //Question index is 0 based
        var post : string = "";
        post += "[b]" + this.questionText +"[/b]\n\n"
        console.log("Post is " + post);

        for(let responseWithChoosers of this.makeSortedResponseWithChoosersList()){
            post += responseWithChoosers.asPostLine();
        }

        post += "\n\n"
        post += this.roundEndScoreGroup.asPost();

        return post;
   }

}

export class ResponseWithChoosers {
    response: String;
    choosers: String[];

    constructor(response: String, choosers: undefined | String[]) {
        this.response = response;
        this.choosers = choosers ?? []; //default if nullish
        this.choosers.sort();
    }

    asPostLine() : String{
        var post : String = "";
        post += this.choosers.length + " ";
        post += this.response + ": ";
        post += this.choosers.join(", ") + "\n";
        return post;
    }
}
