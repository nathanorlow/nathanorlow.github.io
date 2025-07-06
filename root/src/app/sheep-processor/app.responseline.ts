
export class ResponseLine {
    player: string;
    responses: string[];
    lineNum: number;

    constructor(player: string, responses: string[], lineNum: number){
        this.player = player;
        this.responses = responses;
        this.lineNum = lineNum;
    }

    static responseLinesFromInputLines(inputLines: String[], firstLineNum:number) : ResponseLine[] {
        var responseLines : ResponseLine[] = [];
        for(let i = 0; i < inputLines.length; i++){
            var inputLine = inputLines[i].trim();
            if(inputLine == ""){
                continue;
            }
            const lineNum = i + firstLineNum;
            var responseLine : ResponseLine = ResponseLine.fromInputLine(inputLine, lineNum);
            responseLines.push(responseLine);
        }
        console.log("created " + responseLines.length +" responses");
        return responseLines;
    }

    static fromInputLine(line: String, lineNum: number): ResponseLine{
        var responses : string[] = line.split(/,/);
        var player: string|undefined = responses?.shift();
        if(player == undefined){
            player = "Unknown player on line " + lineNum;
        }
        for(let i = 0; i < responses.length; i++){
            responses[i] = responses[i].trim();
        }
        return new ResponseLine(player, responses, lineNum);
    }
}
