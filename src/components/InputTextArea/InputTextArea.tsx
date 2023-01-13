import styles from './InputTextArea.module.scss';
import { useState, ChangeEvent } from 'react';

export const InputTextArea = () => {
  const [valueText, setValueText] = useState('');
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValueText(e.target.value);
};
  return (
   <textarea className={styles.textArea} value={valueText ? valueText : ''} 
      onChange={onChangeText} 
      placeholder='Не более 300 символов' 
    />
  )
}