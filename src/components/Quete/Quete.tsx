import React from "react";
import { TThemeProfile } from "../../services/types/types";
import { ReactComponent as QueteIcon } from "../../images/quete_icon.svg";
import classnames from "classnames";

import styles from './Quete.module.scss';

let cx = classnames.bind(styles);

type Props = {
    text: string;
    theme?: TThemeProfile;
}

const Quete = ({ text, theme = TThemeProfile.DEFULT }: Props) => {

    const cxQueteIcon = cx(styles.Icon, {
        [styles['IconRomantic']]: theme === TThemeProfile.ROMANTIC,
        [styles['IconDaring']]: theme === TThemeProfile.DARING
    });

    const cxText = cx(styles.Text, {
        [styles['TextRomantic']]: theme === TThemeProfile.ROMANTIC,
        [styles['TextDaring']]: theme === TThemeProfile.DARING
    })

    return (
        <div className={styles.Quete}>
            <QueteIcon className={cxQueteIcon} />
            <QueteIcon className={cxQueteIcon} />
            <span className={cxText}>{text}</span>
        </div>
    );
}

export default Quete;