import React from "react";
import { TThemeProfile } from "../../services/types/types";
import {ReactComponent as QueteIcon} from "../../images/quete_icon.svg";
import cx from "classnames";

import styles from './Quete.module.css';

type Props = {
    text: string;
    theme?: TThemeProfile;
}

const Quete = ({ text, theme = TThemeProfile.DEFULT }: Props) => {

    

    return (
        <div className={styles.Quete}>
            <QueteIcon className={styles.Icon}/>
            <QueteIcon className={styles.Icon}/>
            <span className={styles.Text}>{text}</span>
        </div>
    );
}

export default Quete;