import React, { ChangeEvent, useState } from 'react';
import CommentsTable from '../../components/CommentsTable/CommentsTable';
import { SwitchInfo } from '../../components/Switch/Switch';
import InputFilter from '../../shared/inputs/InputFilter/InputFilter';

import styles from './CommentsPage.module.scss';

const CommentsPage = () => {

    const [filter, setFilter] = useState<string>('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    const handleClearFilter = () => {
        setFilter('');
    }

    return (
        <section className={styles.CommentsPage}>
            <div className={styles.Filter}>
                <SwitchInfo />
                <InputFilter
                    name={'filter'}
                    title="Фильтровать"
                    value={filter}
                    placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
                    onChange={handleChange}
                    onClear={handleClearFilter}
                    mix={styles.InputTableFilter}
                />
            </div>
            <div className={styles.TableContent}>
                <CommentsTable filter={filter} />
            </div>
        </section>
    )
}

export default CommentsPage;