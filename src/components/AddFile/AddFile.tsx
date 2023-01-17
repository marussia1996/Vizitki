import stylesAddFile from '../AddFile/AddFile.module.scss'

export const AddFile = () => {

  const onChange = (e: any) => {
    let files = e.target.files;
    console.log(files);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (res: any) => {
      console.log(res.target.result);
    };
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
