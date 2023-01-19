import React from "react";
import CommentsTable from "../../components/CommentsTable/CommentsTable";
import InputText from "../../shared/inputs/InputText/InputText";
import Quete from "../../components/Quete/Quete";
import Scroll from "../../components/Scroll/Scroll";
import StudentTable from "../../components/StudensTable/StudensTable";
import { TThemeProfile } from "../../services/types/types";

const AlexeyM = () => {

    const TextMock = () => {
        return (
            <div style={{ width: '60px' }}>
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
            </div>
        )
    }

    return (
        <>
            <div>
                <InputText />
            </div>
            <div>
                <Quete text="Делай, что должно и&nbsp;будь, что будет." theme={TThemeProfile.DARING} />
            </div>
            <div style={{ height: '300px' }}>
                <Scroll>
                    <TextMock />
                </Scroll>
            </div>
            <div>
                <StudentTable />
            </div>
            <div style={{ paddingTop: '100px' }}>
                <CommentsTable />
            </div>
        </>
    )
}

export default AlexeyM;