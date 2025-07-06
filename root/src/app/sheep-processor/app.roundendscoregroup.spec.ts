import { TestBed } from '@angular/core/testing';
import { RoundEndScoreGroup } from './app.roundendscoregroup';

describe('RoundEndScoreGroup', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoundEndScoreGroup
      ],
    }).compileComponents();
  });

  it('should add on to a previous round end score group to get its current value', () => {
    const emptyRoundEndScoreGroup = new RoundEndScoreGroup();
    const questionOneResponseToChoosers : Map<String,String[]> = 
        new Map([ ["alpha", ["First"]], ["bravo", ["Second","Third"]] ]); 
    const questionTwoResponseToChoosers : Map<String,String[]> = 
        new Map([["apple", ["First", "Second"]], ["banana", ["Third"]] ]);


    const actualQuestionOneGroup = RoundEndScoreGroup.fromPreviousQuestion(emptyRoundEndScoreGroup, questionOneResponseToChoosers);
    const expectedQuestionOnePlayerToScore = new Map([ ["First", 1], ["Second", 2], ["Third", 2] ]); 
    expect(actualQuestionOneGroup.playerToScoreAtRoundEnd).toEqual(expectedQuestionOnePlayerToScore);

    const actualQuestionTwoGroup = RoundEndScoreGroup.fromPreviousQuestion(actualQuestionOneGroup, questionTwoResponseToChoosers);
    const expectedQuestionTwoPlayerToScore = new Map([ ["First", 3], ["Second", 4], ["Third", 3] ]); 
    expect(actualQuestionTwoGroup.playerToScoreAtRoundEnd).toEqual(expectedQuestionTwoPlayerToScore);

  });


});
