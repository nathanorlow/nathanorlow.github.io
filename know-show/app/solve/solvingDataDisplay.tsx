interface SolvingDataDisplayProps {
    revealCount: number;
    guessCount: number
}

export function SolvingDataDisplay(props: SolvingDataDisplayProps){
    return (
     <div className="dataDisplay">
        Total reveals: {props.revealCount}
        <br />
        Total guesses: {props.guessCount}
     </div>
    );
}