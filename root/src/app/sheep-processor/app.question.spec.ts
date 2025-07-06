import { TestBed } from '@angular/core/testing';
import { Question } from './app.question';
import { ResponseLine } from './app.responseline';

describe('Question', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Question
      ],
    }).compileComponents();
  });

  it('should construct questions from an input line', () => {
    var inputLine : String = "unused, Question 1, Question 2";
    var questions : Question[] = Question.questionsFromInputLine(inputLine); 
    expect(questions.length).toEqual(2);
    expect(questions[0]).toEqual(new Question(1, "Question 1"));
    expect(questions[1]).toEqual(new Question(2, "Question 2"));
  });

  //todo: this is more of a regression test
  it(`should add response lines to response to choosers`, () => {
    var questionLine : String = "unused, Question 1, Question 2";
    var questions : Question[] = Question.questionsFromInputLine(questionLine);

    const inputLines : String[] = ["First, alpha, apple", "Second, bravo, apple", "Third, bravo, banana"];
    const responseLines : ResponseLine[] = ResponseLine.responseLinesFromInputLines(inputLines, 0);

    for(var question of questions){
      question.updateWithResponseLineArray(responseLines);
    }

    var expectedResponseToChoosers : Map<String,String[]> = new Map([ ["alpha", ["First"]], ["bravo", ["Second","Third"]] ]); 
    expect(questions[0].responseToChoosers).toEqual(expectedResponseToChoosers);
    expectedResponseToChoosers = new Map([["apple", ["First", "Second"]], ["banana", ["Third"]] ]);
    expect(questions[1].responseToChoosers).toEqual(expectedResponseToChoosers);

  });


});
