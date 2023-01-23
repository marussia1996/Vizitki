import './Feedback.scss';
import { messages } from './data';
import { CommentRaw, LikeRaw } from '../../services/types/types';
import { v4 as createUUID } from 'uuid';
<<<<<<< HEAD
import { KeyboardEventHandler, useRef } from 'react';
import { postUserReactions } from '../../utils/api';

type TProps = {
  id: string;
=======

type TProps = {
>>>>>>> 89fd32dccff75e3fac536172232f2b4418c8f09e
  comments?: Array<CommentRaw & LikeRaw>;
};

//TODO: Добавить закрытие по кнопке Escape
<<<<<<< HEAD
export default function Feedback({ comments, id }: TProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendReaction: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if(e.key === 'Enter') {
      // FIXME выдаёт ошибку 403
      postUserReactions(id, {target: 'profile', text: inputRef.current!.value});
      inputRef.current!.value = '';
    }
  }

=======
export default function Feedback({ comments }: TProps) {
>>>>>>> 89fd32dccff75e3fac536172232f2b4418c8f09e
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

      <input type='text' placeholder='Обратная связь' className='input' onKeyUp={sendReaction} ref={inputRef}></input>

      {messages.length !== 0 && (<div className='feedbackTape'>
        {comments?.map(item => {
          return (
            <div className='message' key={createUUID()}>
              <p className='messageText'>{item.text}</p>
            </div>
          )
        })}
      </div>
      )}
    </div>
  )
}