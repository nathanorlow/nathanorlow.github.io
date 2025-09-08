interface SolvingDataDisplayProps {
    revealCount: number;
    wrongGuessCount: number
}

export function SolvingDataDisplay(props: SolvingDataDisplayProps){
    return (
     <div className="dataDisplay">
        Total reveals: {props.revealCount}
        <br />
        Wrong guesses: {props.wrongGuessCount}
     </div>
    );
}