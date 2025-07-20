interface SolvingDataDisplayProps {
    revealCount: number
}

export function SolvingDataDisplay(props: SolvingDataDisplayProps){
    return (
     <div>
        Total reveals: {props.revealCount}
     </div>
    );
}