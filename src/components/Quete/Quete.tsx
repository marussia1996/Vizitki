import React, { useState } from "react";
import { BaseFiedsRaw, TThemeProfile, UserWithProfileRaw } from "../../services/types/types";
import { ReactComponent as QueteIcon } from "../../images/quete_icon.svg";
import classnames from "classnames";

import styles from './Quete.module.scss';
import Feedback from "../Feedback/Feedback";
import { CommentIcon } from "../CommentIcon/CommentIcon";
import { userInfo } from "os";

let cx = classnames.bind(styles);

type Props = {
    text: string;
    theme?: TThemeProfile;
    user: BaseFiedsRaw & UserWithProfileRaw & {reactions: number};
}

const Quete = ({ text, theme = TThemeProfile.DEFAULT, user }: Props) => {
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
                    commentsQuantity={0}
                />
                <QueteIcon className={cxQueteIcon} />
                <QueteIcon className={cxQueteIcon} />
                <div className={styles.TextCnt}>
                  <span className={cxText}>{text}</span>
                </div>
                {/* FIXME нужно пробросить корректный id профиля в Feedback */}
                {isOpenFeedback && <Feedback id={'замени меня!!!'} />}
            </div>
        </>
    );
}

export default Quete;