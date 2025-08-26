interface SolvingDataDisplayProps {
    revealCount: number
}

export function SolvingDataDisplay(props: SolvingDataDisplayProps){
    return (
     <div className="dataDisplay">
        Total reveals: {props.revealCount}
     </div>
    );
}