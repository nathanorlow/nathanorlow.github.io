import { Button } from "@mui/material";
import { useNavigate } from "react-router";

interface RedirectButtonProps {
    buttonText: string;
    buttonLink: string;
}

const BUTTON_DEFAULTS_SX = 
    {fontSize: 24, width: 'fit-content', minWidth: 0, color: 'black', fontWeight: 'bold'};

export function RedirectButton(props: RedirectButtonProps){
    const navigate = useNavigate();
    const {buttonText, buttonLink} = props;

    const handleClick = () => {
        navigate(buttonLink);
    }

    return (
        <div className="redirectButtonContainer">
            <Button onClick={handleClick} sx={BUTTON_DEFAULTS_SX}>
                {buttonText}
            </Button>
        </div>
    );
}