import stylesAddFile from '../AddFile/AddFile.module.scss';
import { useState } from 'react';

export const AddFile = () => {

  const [files, setFiles] = useState(null);

  const onChange = (e: any) => {
    let files = e.target.files;
    console.log(files);
    const reader = new FileReader();
    reader.onload = (res: any) => {
      setFiles(res.target.result)
      console.log(res.target.result);
    };
    reader.readAsText(files[0]); //TODO решить какой метод использовать для чтения файла, в каком виде нужны данные
    console.log(JSON.stringify(files));
  }
  return (
    <div className={`${stylesAddFile.wrap}`}>
      <h2 className={`${stylesAddFile.title}`}>Добавить студентов</h2>
      <p className={`${stylesAddFile.content}`}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
      <input
        type='file'
        name='file'
        id='file'
        accept=".xlsx, .cvs"
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
