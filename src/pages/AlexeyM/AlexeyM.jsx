import React from "react";
import Quete from "../../components/Quete/Quete";
import { TThemeProfile } from "../../services/types/types";

const AlexeyM = () => {
    return (
        <div>
            <Quete text="Делай, что должно и&nbsp;будь, что будет." theme={TThemeProfile.ROMANTIC}/>
        </div>
    )
}

export default AlexeyM;