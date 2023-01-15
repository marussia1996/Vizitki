import styles from './InputTextArea.module.scss';
import { useState, ChangeEvent } from 'react';
import React, { FC } from 'react'

type TState = {
  state: 'quote' | 'other';
}

export const InputTextArea: FC<TState> = ({state}) => {
  const [valueText, setValueText] = useState('');
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValueText(e.target.value);
  };

  const placeholderQuote = 'Не более 100 символов';
  const placeholderOther = 'Не более 300 символов';
  
  return (
   <textarea className={styles.textArea} value={valueText ? valueText : ''} 
      onChange={onChangeText}
      placeholder={state==='quote'? placeholderQuote : placeholderOther}
      maxLength={state==='quote'? 100 : 300}
    />
  )
}