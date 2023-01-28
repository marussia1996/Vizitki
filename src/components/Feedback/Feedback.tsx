import './Feedback.scss';
import {messages} from './data';
import {CommentRaw, LikeRaw, TargetRaw, TUserReactionsRaw} from '../../services/types/types';
import {
  ChangeEventHandler,
  FormEventHandler,
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo, useCallback
} from 'react';
import {postUserReactions} from '../../utils/api';
import {getUserReactions} from '../../utils/api';
import {useOutsideClick} from "../../hooks/useOutsiteClick";
import {useKeyUp} from "../../hooks/useKeyUp";
import {useFetching} from "../../hooks/useFetching";
import classNames from "classnames";
import Emoji from "../../shared/Smile/Emoji";
import {useAuth} from "../../hooks/useAuth";

type TProps = {
  id: string;
  comments?: Array<CommentRaw & LikeRaw>;

  target: TargetRaw;

  onClose: () => void;

  onChangeReactions?: () => void;
};

const emotions: { value: string, displayValue: string }[] = [
  {value: 'like', displayValue: '👍'},
  {value: 'dislike', displayValue: '👎️'},
  {value: 'hello', displayValue: '👋️'},
  {value: 'smile', displayValue: '🙂️'},
  {value: 'sad', displayValue: '😞️'},
  {value: 'heart', displayValue: '❤️'},
]


export default function Feedback({comments, id, onClose, onChangeReactions, target}: TProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const divRef = useRef(null);
  const {user} = useAuth();

  useOutsideClick(divRef, onClose);
  useKeyUp('Escape', onClose)

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [isLoading, error, fetching] = useFetching(async ([comment]) => {
    await postUserReactions(id, comment);

    if (comment.text) {
      setInputValue('');
    }

    if (onChangeReactions) {
      onChangeReactions();
    }
  })


  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!inputValue || inputValue.length === 0) return;
    fetching({target: target, text: inputValue});
  }

  const setEmotion = (emotion: string, isActive: boolean) => {
    if (!isActive) {
      fetching({target, emotion})
    }
  }

  const isEmotionActive = useCallback((emotion: string, comments?: LikeRaw[]): boolean => {
    return comments
      ? comments.find(e => e.emotion === emotion && e.from._id === user?._id) !== undefined
      : false;
  }, [comments])

  const emotionCount = useCallback((emotion: string, comments?: LikeRaw[]) => {
    return comments ? comments.filter(c => c.emotion === emotion).length : 0
  }, [comments])


  console.log(comments);

  return (

    <div className='modal' ref={divRef}>
      <div className='smilesCnt'>
        {emotions.map((smile) => (
          <Emoji key={smile.value} value={smile.displayValue} isActive={isEmotionActive(smile.value, comments)}
                 count={emotionCount(smile.value, comments)} onClick={setEmotion}/>
        ))
        }
      </div>

      <form className='form' onSubmit={onSubmit}>
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