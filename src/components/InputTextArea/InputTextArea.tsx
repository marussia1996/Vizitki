import styles from './InputTextArea.module.scss';
import { useState, ChangeEvent } from 'react';
import React, { FC } from 'react'

type TState = {
  state: 'quote' | 'other';
  label?: string
}

export const InputTextArea: FC<TState> = ({state, label}) => {
  const [valueText, setValueText] = useState('');
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValueText(e.target.value);
  };

  const placeholderQuote = 'Не более 100 символов';
  const placeholderOther = 'Не более 300 символов';
  
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={styles.textArea} value={valueText ? valueText : ''} 
          onChange={onChangeText}
          placeholder={state==='quote'? placeholderQuote : placeholderOther}
          maxLength={state==='quote'? 100 : 300}
        />
    </div>
  )
}