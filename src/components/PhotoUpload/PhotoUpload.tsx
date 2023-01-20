import styles from './PhotoUpload.module.scss';
import React, {FC, useRef} from 'react';
import camera from '../../images/camera.svg';
import {TInputChange} from "../../shared/inputs";

type TInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  onFileChange?: (e: TInputChange<string>) => void;
};

export const PhotoUpload: FC<TInputProps> = ({name, value, onFileChange, ...rest}) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageChange = (e: any) => {
    const [image] = e.target.files;
    const url = image ? URL.createObjectURL(image) : undefined;
    if (image) {
      image.src = url;
      image.className = styles.photo;
    }
    if (onFileChange) {
      onFileChange({
        target: {
          name: name || '',
          value: url
        }
      })
    }
  };

  const onClick = () => {
    inputRef.current?.click();
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>Загрузите фото *</p>
      <p className={styles.description}>(размер не менее 440х440)</p>
      <div className={styles.wrapPhoto} onClick={onClick}>
        <img alt='Фото' className={value ? styles.photo : styles.hidden} src={value as string} ref={imageRef}/>
        <div className={value ? styles.button + ' ' + styles.notVisible : styles.button}>
          <img src={camera} className={styles.camera}/>
        </div>
      </div>
      <input
        type='file'
        name={name}
        accept='image/*'
        className={styles.hidden}
        onChange={handleImageChange}
        required
        ref={inputRef}
      />
    </div>
  );
};