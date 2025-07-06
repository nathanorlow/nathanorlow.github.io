import { Component } from '@angular/core';
import { ResponseData} from './processor/app.responsedata';

@Component({
  selector: 'sheep-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  mainMessage: String = "Enter comma text in left box, then click on right box.";
  responseData: ResponseData = new ResponseData("");
  title: String  = 'sheep-main'; //used in test case
  inputQuestionNum: number  = 1;
  inputText: String = "?";
  displayPost: String = "(none)";

  copiedResponse: string|undefined = undefined;
  copiedResponseLineIndex: Number|undefined = undefined;

  delimiters : string[] = [",",", "];
  newDelimiter : string = ",";

  makeDisplayPost(){
    this.responseData = new ResponseData(this.inputText);
    this.displayPost = this.responseData.processAllLines(this.inputQuestionNum - 1).toString();
  }

  //todo update when question num changes
  responseButtonClick(questionIndex: number, responseLineIndex: number, event?: MouseEvent){
    if(responseLineIndex == this.copiedResponseLineIndex){ //deselect
      this.copiedResponse = undefined;
      this.copiedResponseLineIndex = undefined;
    } else if(this.copiedResponse == undefined){ //select
      this.copiedResponse = this.responseData.responseLines[responseLineIndex].responses[questionIndex];
      this.copiedResponseLineIndex = responseLineIndex;
    }else{//copy
      this.responseData.responseLines[responseLineIndex].responses[questionIndex] = this.copiedResponse;
    }
    this.makeInputTextFromResponseData();
  }

  public questionNumberChanged(){
    this.copiedResponse = undefined;
    this.copiedResponseLineIndex = undefined;
    this.makeInputTextFromResponseData();
  }

  public makeInputTextFromResponseData(){
    this.inputText = this.responseData.asInputLinesString(this.newDelimiter);
    this.makeDisplayPost();
  }

  public setNewDelimiter(newDelimiter : string){
    this.newDelimiter = newDelimiter;
  }

}
