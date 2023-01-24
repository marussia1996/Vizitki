import React, { useCallback, useEffect, useState } from "react";
import { BaseFiedsRaw, CommentRaw, ShortProfileRaw, UserAccountRaw, UserRefRaw } from "../../services/types/types";
import { deleteComment, getComments, getProfiles } from "../../utils/api";
import { compare } from "../../utils/utils";
import CommentRowRead from "../CommentRowRead/CommentRowRead";
import Loader from "../Loader/Loader";
import Scroll from "../Scroll/Scroll";
import { Table, Thead, Th, Tbody } from "../Table/Table";

import styles from './CommentsTable.module.scss';

type TComment = CommentRaw & { to: UserRefRaw } & { cohort?: string, createdAt: Date };

type Props = {
    filter: string;
}

const filterTable = (comment: TComment, filter: string) => {
    return compare(comment.from.name, filter) || compare(comment.to.name, filter) || compare(comment.cohort ? comment.cohort : '', filter)
}

const prepareComments = (
    commentsRaw: (CommentRaw & { to: UserRefRaw; })[],
    profilesRaw: (BaseFiedsRaw & UserAccountRaw & { profile: ShortProfileRaw; })[]) => {
    return commentsRaw.reduce((acc: TComment[], item) => {
        const cohort = profilesRaw.find(profile => profile._id === item.from._id)?.cohort;
        //FIXME: В API нет даты создания комментария 
        const comment = { ...item, cohort, createdAt: new Date() }
        return [...acc, comment];
    }, [])
};

const CommentsTable = ({ filter = '' }: Props) => {
    const [comments, setComments] = useState<TComment[]>([]);
    const [isFetching, setFetching] = useState<boolean>(true);

    const handleDelete = useCallback((id: string) => {
        setFetching(true);
        deleteComment(id).then(res => {
            getComments().then(commentsRaw => {
                if (commentsRaw) {
                    getProfiles().then(profilesRaw => {
                        if (profilesRaw) {
                            const comments = prepareComments(commentsRaw.items, profilesRaw.items);
                            setComments(comments);
                        }
                        setFetching(false);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        setFetching(true);
        getComments().then(commentsRaw => {
            if (commentsRaw) {
                getProfiles().then(profilesRaw => {
                    if (profilesRaw) {
                        const comments = prepareComments(commentsRaw.items, profilesRaw.items);
                        setComments(comments);
                    }
                    setFetching(false);
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }, [])

    const filteredComments = comments.filter(comment => filterTable(comment, filter))

    if(isFetching){
        return(<Loader/>)
    }

    return (
            <div className={styles.TableContent}>
                {filteredComments.length === 0 ? (
                    <p className={styles.EmptySearch}>Не удалось никого найти. Исправьте запрос или сбросьте фильтр</p>
                ) : (
                    <>
                        <Scroll mix={styles.CommentScrollTable}>
                            <Table>
                                <Thead>
                                    <Th>{'Когорта'}</Th>
                                    <Th>{'Дата'}</Th>
                                    <Th>{'Отправитель'}</Th>
                                    <Th>{'Получатель'}</Th>
                                    <Th>{'Откуда комментарий'}</Th>
                                    <Th>{'Текст комментария'}</Th>
                                    <Th> </Th>
                                </Thead>
                                <Tbody>
                                    {filteredComments.map(({ _id: id, cohort, from, target, text, to, createdAt }) =>
                                        <CommentRowRead
                                            key={id}
                                            id={id}
                                            date={createdAt}
                                            cohort={cohort}
                                            from={from.name}
                                            target={target}
                                            text={text}
                                            to={to.name}
                                            onClickDelete={handleDelete}
                                        />
                                    )}
                                </Tbody>
                            </Table>
                        </Scroll>
                    </>
                )}
            </div>
    )
}

export default CommentsTable;