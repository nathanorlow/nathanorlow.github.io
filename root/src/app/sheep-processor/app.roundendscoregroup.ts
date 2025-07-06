

export class RoundEndScoreGroup {
    playerToScoreAtRoundEnd: Map<String, number>;

    constructor(){
        this.playerToScoreAtRoundEnd = new Map<String, number>();
    }

    static fromPreviousQuestion(previousGroup : RoundEndScoreGroup, responseToChoosers : Map<String, String[]>) {
        var roundEndScoreGroup : RoundEndScoreGroup = new RoundEndScoreGroup();
        for(const [response, choosers] of responseToChoosers){
            const pointsThisQuestion = choosers.length; //score = number of choosers
            for(let chooser of choosers){
                var previousScore: number = previousGroup.getScoreForPlayer(chooser);
                roundEndScoreGroup.playerToScoreAtRoundEnd.set(chooser, previousScore + pointsThisQuestion);
                console.log("Player " + chooser +  " has score " + previousScore + " + " + pointsThisQuestion);
            }
        }
        return roundEndScoreGroup; //return to use in next call
    }

    getScoreForPlayer(player: String){
        return this.playerToScoreAtRoundEnd.get(player) ?? 0;
    }
    

    
    asPost(): String{
        var post = "";
        var playerScorePairs:  [String, number][] = Array.from(this.playerToScoreAtRoundEnd); 
        playerScorePairs.sort(
            (a,b) => { return ( b[1] - a[1] ) }
        );
    
        for(const [player, score] of playerScorePairs){
            post += player + ": " + score + "\n";
        }
        return post;
    }
    
}