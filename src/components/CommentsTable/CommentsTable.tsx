import React, { useCallback, useEffect, useRef, useState } from "react";
import { TCommentRaw } from "../../services/types/types";
import CommentRowRead from "../CommentRowRead/CommentRowRead";
import Scroll from "../Scroll/Scroll";
import { Table, Thead, Th, Tbody } from "../Table/Table";

const commentDataMock: TCommentRaw[] = [
    {
        "_id": "c824a2de0b675b0acb5a2923",
        "from": {
            "_id": "e638ad9bce6d7efd1b5b035b",
            "name": "Elvira Grady",
            "email": "Anita93@hotmail.com"
        },
        "target": "hobby",
        "text": "Laborum omnis harum modi omnis architecto ipsam adipisci dolore.",
        "to": {
            "_id": "abfccdaa23e0bd1c4448d2f3",
            "name": "Ricky Fadel",
            "email": "Chaim.Armstrong@gmail.com"
        }
    },
    {
        "_id": "bad224dbc4a601caff7e0b2c",
        "from": {
            "_id": "e638ad9bce6d7efd1b5b035b",
            "name": "Elvira Grady",
            "email": "Anita93@hotmail.com"
        },
        "target": "edu",
        "text": "Soluta consectetur tempore eaque modi sequi autem ducimus.",
        "to": {
            "_id": "abfccdaa23e0bd1c4448d2f3",
            "name": "Ricky Fadel",
            "email": "Chaim.Armstrong@gmail.com"
        }
    },
    {
        "_id": "c2f15f9b4315bb20aebf9a1d",
        "from": {
            "_id": "e638ad9bce6d7efd1b5b035b",
            "name": "Elvira Grady",
            "email": "Anita93@hotmail.com"
        },
        "target": "status",
        "text": "Eveniet excepturi commodi eaque dignissimos quae nesciunt nam dolorum.",
        "to": {
            "_id": "abfccdaa23e0bd1c4448d2f3",
            "name": "Ricky Fadel",
            "email": "Chaim.Armstrong@gmail.com"
        }
    },
    {
        "_id": "38eb4bbe3da2fcf2d4cfcd59",
        "from": {
            "_id": "e638ad9bce6d7efd1b5b035b",
            "name": "Elvira Grady",
            "email": "Anita93@hotmail.com"
        },
        "target": "job",
        "text": "Accusantium neque minus tempora.",
        "to": {
            "_id": "abfccdaa23e0bd1c4448d2f3",
            "name": "Ricky Fadel",
            "email": "Chaim.Armstrong@gmail.com"
        }
    },
    {
        "_id": "0ebcdb97d72b2b17345c30c8",
        "from": {
            "_id": "e638ad9bce6d7efd1b5b035b",
            "name": "Elvira Grady",
            "email": "Anita93@hotmail.com"
        },
        "target": null,
        "text": "Libero ad tempora exercitationem numquam adipisci quibusdam doloremque incidunt.",
        "to": {
            "_id": "abfccdaa23e0bd1c4448d2f3",
            "name": "Ricky Fadel",
            "email": "Chaim.Armstrong@gmail.com"
        }
    }
]

const CommentsTable = () => {
    const [comments, setComments] = useState<TCommentRaw[]>([]);

    const refTable = useRef(null);

    const handleDelete = useCallback((id: string) => {
        console.log('DELETE REQUEST MOCK: ', id);
    }, [])

    useEffect(() => {
        setComments(commentDataMock);
    }, [])

    return (
        <Scroll>
            <Table refTable={refTable}>
                <Thead>
                    <Th>{'Когорта'}</Th>
                    <Th>{'Дата'}</Th>
                    <Th>{'Отправитель'}</Th>
                    <Th>{'Получатель'}</Th>
                    <Th>{'Откуда комментарий'}</Th>
                    <Th>{'Текст комментария'}</Th>
                </Thead>
                <Tbody>
                    {comments.map(({ _id: id, from, target, text, to }) =>
                        <CommentRowRead
                            key={id}
                            id={id}
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
    )
}

export default CommentsTable;