import styles from './InputFile.module.scss'
import {useFiles} from '../../../hooks/files/useFiles';
import InputWrapper, {TInputWrapperProps} from "../InputWrapper/InputWrapper";
import {FC} from "react";
import Icon from "../../Icon/Icon";
import {iconFile} from "../../Icon/lib";
import {TInputChange} from "../index";

type TInputFileProps = TInputWrapperProps & {
  onFileChange: (e:TInputChange<File>)=>void;
  name: string
}
export const InputFile: FC<TInputFileProps> = (props) => {

  const {labelText, mix, error, description} = props;
  
  const onChange = () => {
    if(inputFileRef.current){
      const e: TInputChange<File> = {
        target: {
          name: props.name,
          value: inputFileRef.current.files ? inputFileRef.current.files[0] : undefined
        }
      }
      props.onFileChange(e);
    }
  }
  
  const {
    handleDroppedFile,
    handleFileDialog,
    imageContainerRef,
    inputFileRef,
    openDialog,
    selectedFile,
    stopDragEvent
  } = useFiles(onChange);
  
  return (
    <InputWrapper labelText={labelText} mix={mix} error={error} description={description}>
      <div className={styles.content}
           ref={imageContainerRef}
           onDragEnter={stopDragEvent}
           onDragOver={stopDragEvent}
           onDrop={handleDroppedFile}>
        <div className={styles.fakeInput} onClick={openDialog}>
          <span>{selectedFile || ''}</span>
          <input
            className={styles.input}
            type="file"
            ref={inputFileRef}
            accept="image/*"
            onChange={handleFileDialog}
          />
          <div className={styles.wrapper}>
            <Icon path={iconFile} width={'18px'} height={'20px'} stroke={'none'}/>
          </div>
        </div>
      </div>
    </InputWrapper>
  )
}
