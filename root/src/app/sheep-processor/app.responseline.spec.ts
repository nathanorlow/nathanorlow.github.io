import { TestBed } from '@angular/core/testing';
import { ResponseLine } from './app.responseline';

describe('ResponseLine', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResponseLine
      ],
    }).compileComponents();
  });

  it('should create a response line from a string', () => {
    const inputLine = "First, apple, alpha";
    const actualResponseLine = ResponseLine.fromInputLine(inputLine, 1);
    expect(actualResponseLine.player).toEqual("First");
    expect(actualResponseLine.responses).toEqual(["apple", "alpha"]);
    expect(actualResponseLine.lineNum).toEqual(1);
  });

  it('should create several response lines from a multiline string', () => {
    const inputLines = ["First, apple, alpha", "Second, banana, alpha"];
    const actualResponseLineArray = ResponseLine.responseLinesFromInputLines(inputLines, 5);
    expect(actualResponseLineArray[0].player).toEqual("First");
    expect(actualResponseLineArray[0].responses).toEqual(["apple", "alpha"]);
    expect(actualResponseLineArray[0].lineNum).toEqual(5);
    
    expect(actualResponseLineArray[1].player).toEqual("Second");
    expect(actualResponseLineArray[1].responses).toEqual(["banana", "alpha"]);
    expect(actualResponseLineArray[1].lineNum).toEqual(6);
  });


});
