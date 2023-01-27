import './Feedback.scss';
import { messages } from './data';
import { CommentRaw, LikeRaw } from '../../services/types/types';
import { ChangeEventHandler, FormEventHandler, useRef, useEffect, useState } from 'react';
import { postUserReactions } from '../../utils/api';

type TProps = {
  id: string;
  comments?: Array<CommentRaw & LikeRaw>;
};

//TODO: Добавить закрытие по кнопке Escape
export default function Feedback({ comments, id }: TProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const enterText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  }

  const sendReaction: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // FIXME выдаёт ошибку 403
    postUserReactions(id, { target: 'profile', text: inputRef.current!.value });
    setInputValue('');

  }
  console.log(comments)
  return (
    <div className='modal'>
      <div className='smilesCnt'>
        <span className='smile smileActive'>&#128077;<span className='reactionsNumb'>1</span></span>
        <span className='smile'>&#128078;</span>
        <span className='smile'>&#128075;</span>
        <span className='smile'>&#128578;</span>
        <span className='smile'>&#128542;</span>
        <span className='smile'>&#129315;</span>
        <span className='smile'>&#128556;</span>
        <span className='smile'>&#128561;</span>
        <span className='smile'>&#128525;</span>
        <span className='smile'>&#128420;</span>
      </div>

      <form className='form' onSubmit={sendReaction}>
        <input type='text' placeholder='Обратная связь' className='input' ref={inputRef} value={inputValue} onChange={enterText}></input>
      </form>

      {messages.length !== 0 && (<div className='feedbackTape'>
        {comments?.map((item, i) => {
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