import stylesAddFile from '../AddFile/AddFile.module.scss'
import { Button } from '../Button/Button'
//пока не знаю нужны ли здесь пропсы и какие
export const AddFile = () => {
  return (
    <div className={`${stylesAddFile.wrap}`}>
      <h2 className={`${stylesAddFile.title}`}>Добавить студентов</h2>
      <p className={`${stylesAddFile.content}`}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
      <Button className='buttonSmall' disabled={false} onClick={()=>console.log('add')} type='submit'>Добавить студента</Button>
    </div>
  )
}
