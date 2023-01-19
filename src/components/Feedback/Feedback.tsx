import './Feedback.scss';
import { messages } from './data';

export default function Feedback() {
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

      <input type='text' placeholder='Обратная связь' className='input'></input>

      {messages.length !== 0 && (<div className='feedbackTape'>
        {messages.map(item => {
          return (
            <div className='message'>
              <p className='messageText'>{item}</p>
            </div>
          )
        })}
      </div>
      )}
    </div>
  )
}