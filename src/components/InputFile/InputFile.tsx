import stylesInput from '../InputFile/InputFile.module.scss'
import fileIcon from '../../images/fileIcon.svg'
import { useHooks } from '../../utils/FileHooks';

export const InputFile = () => {
  const {
    handleDroppedFile,
    handleFileDialog,
    imageContainerRef,
    inputFileRef,
    openDialog,
    selectedFile,
    stopDragEvent
  } = useHooks();
  console.log(selectedFile);
  return (
    <div className={`${stylesInput.content}`}
        ref={imageContainerRef}
        onDragEnter={stopDragEvent}
        onDragOver={stopDragEvent}
        onDrop={handleDroppedFile}>
      <label className={`${stylesInput.label}`}>Увлечения, досуг, интересы</label>
      <div className={`${stylesInput.fakeInput}`} onClick={openDialog}>
        <span className={`${stylesInput.fileName}`}>{selectedFile || ''}</span>
        <input
          className={`${stylesInput.input}`}
          type="file"
          ref={inputFileRef}
          accept="image/*"
          onChange={handleFileDialog}
          />
        <div className={`${stylesInput.wrapper}`}>
          <img className={`${stylesInput.icon}`} src={fileIcon} alt='иконка файла'/>
        </div>
      </div>
      <span className={`${stylesInput.signature}`}>Рекомендуемый размер фото 230х129</span>
    </div>
  )
}
