import React, { useState } from "react";
import { TThemeProfile } from "../../services/types/types";
import { ReactComponent as QueteIcon } from "../../images/quete_icon.svg";
import classnames from "classnames";

import styles from './Quete.module.scss';
import Feedback from "../Feedback/Feedback";
import { CommentIcon } from "../CommentIcon/CommentIcon";

let cx = classnames.bind(styles);

type Props = {
    text: string;
    theme?: TThemeProfile;
}

const Quete = ({ text, theme = TThemeProfile.DEFAULT }: Props) => {
    const [isOpenFeedback, setFeedbackState] = useState(false);

    const handleFeedback = () => {
        setFeedbackState(!isOpenFeedback);
    }

    const cxQueteIcon = cx(styles.Icon, {
        [styles['IconRomantic']]: theme === TThemeProfile.ROMANTIC,
        [styles['IconDaring']]: theme === TThemeProfile.DARING
    });

    const cxText = cx(styles.Text, {
        [styles['TextRomantic']]: theme === TThemeProfile.ROMANTIC,
        [styles['TextDaring']]: theme === TThemeProfile.DARING
    })

    return (
        <>
            <div className={styles.Quete}>
                <CommentIcon
                    handleFeedback={handleFeedback}
                    color='dark'
                    mix={styles.CommentButton}
                />
                <QueteIcon className={cxQueteIcon} />
                <QueteIcon className={cxQueteIcon} />
                <span className={cxText}>{text}</span>
                {isOpenFeedback && <Feedback />}
            </div>
        </>
    );
}

export default Quete;