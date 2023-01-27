import './Feedback.scss';
import {messages} from './data';
import {CommentRaw, LikeRaw, TUserReactionsRaw} from '../../services/types/types';
import {ChangeEventHandler, FormEventHandler, useRef, useEffect, useState, Dispatch, SetStateAction} from 'react';
import {postUserReactions} from '../../utils/api';
import {getUserReactions} from '../../utils/api';
import {useOutsideClick} from "../../hooks/useOutsiteClick";
import {useKeyUp} from "../../hooks/useKeyUp";
import {useFetching} from "../../hooks/useFetching";
import classNames from "classnames";
import Smile from "../../shared/Smile/Smile";

type TProps = {
  id: string;
  comments?: Array<CommentRaw & LikeRaw>;
  updateData: Dispatch<SetStateAction<TUserReactionsRaw | undefined>>

  onClose: () => void;

  onChangeReactions?: () => void;
};

const emotions: { value: string, displayValue: string }[] = [
  {value: 'like', displayValue: '&#128078;'},
  {value: 'dislike', displayValue: '&#128078;'},
  {value: 'hello', displayValue: '&#128075;'},
  {value: 'smile', displayValue: '&#128578;'},
  {value: '1', displayValue: '&#129315;'},
  {value: '2', displayValue: '&#128556;'},
  {value: '3', displayValue: '&#128561;'},
  {value: 'heart', displayValue: '&#128420;'},
]


export default function Feedback({comments, id, onClose, onChangeReactions}: TProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const divRef = useRef(null);

  useOutsideClick(divRef, onClose);
  useKeyUp('Escape', onClose)

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [isLoading, error, fetching] = useFetching(async () => {
    const comment = {target: 'profile', text: inputValue}
    await postUserReactions(id, comment);

    setInputValue('');

    if (onChangeReactions) {
      onChangeReactions();
    }
  })


  const sendReaction: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!inputValue || inputValue.length === 0) return;
    fetching();
  }

  console.log(comments);

  return (

    <div className='modal' ref={divRef}>
      <div className='smilesCnt'>
        {emotions.map((smile) => (
          <Smile value={smile.displayValue} isActive={false} count={0}/>
        ))
        }
      </div>

      <form className='form' onSubmit={sendReaction}>
        <input type='text' placeholder='Обратная связь' className={classNames('input', {'inputError': error})}
               ref={inputRef} value={inputValue}
               onChange={(e) => setInputValue(e.target.value)} disabled={isLoading}
               title={error}
        />
      </form>

      {messages.length !== 0 && (<div className='feedbackTape'>
          {comments?.filter(x => x.text).map((item, i) => {
            return (
              <div className='message' key={i}>
                <p className='messageText'>{item.text}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}