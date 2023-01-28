import stylesAddFile from '../AddFile/AddFile.module.scss';
import {ChangeEvent, FC, useState} from 'react';

type TAddFileProps = {
  onFileSelect: (file: File) => void;
  disabled?: boolean
}

export const AddFile:FC<TAddFileProps> = ({onFileSelect, disabled}) => {
  //todo: добавить кнопку вместо <label>
  //todo: сделать ее заблокированной когда приходит disabled - значит процесс обработки файла еще не закончен
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target && e.target.files && e.target.files.length){
      onFileSelect(e.target.files[0]);
    }
  }
  
  return (
    <div className={`${stylesAddFile.wrap}`}>
      <h2 className={`${stylesAddFile.title}`}>Добавить студентов</h2>
      <p className={`${stylesAddFile.content}`}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
      <input
        type='file'
        name='file'
        id='file'
        accept=".xlsx, .csv"
        className={stylesAddFile.input}
        onChange={onChange}
        required
      />
      <label htmlFor='file' className={stylesAddFile.label}>
        <span className={stylesAddFile.button}>Выберите файл</span>
      </label>
    </div>
  )
}
