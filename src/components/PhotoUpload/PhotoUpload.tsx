import styles from './PhotoUpload.module.scss';
import { MouseEventHandler, FC, useState, useCallback, useMemo } from 'react';
import camera from '../../images/camera.svg';

type TPhoto = {
  form?: any;
  setValue?: any;
}
export const PhotoUpload = ({ form, setValue }: TPhoto) => {

  const [image, setImage] = useState() as any;
  const [isVisible, setIsVisible] = useState(true);
  const [hover, setHover] = useState(false);

  const handleImageChange = (e: any) => {
    const [image] = e.currentTarget.files;
    setImage(URL.createObjectURL(image));
    setValue({ ...form, [e.currentTarget.name]: URL.createObjectURL(image) });
  };

  const handleVisibleButton = useCallback(() => {
    if (image !== undefined && !hover) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    if (image !== undefined && hover) {
      setIsVisible(true);
    }
  }, [hover, image]);

  useMemo(() => {
    handleVisibleButton();
  }, [handleVisibleButton]);

  const handleHover: MouseEventHandler<HTMLLabelElement> = (e) => {
    if (e.type === 'mouseenter') {
      setHover(true);
    } else setHover(false);
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>Загрузите фото *</p>
      <p className={styles.description}>(размер не менее 440х440)</p>
      <input
        type='file'
        name='photo'
        id='photo'
        accept='image/*'
        className={styles.input}
        onChange={handleImageChange}
        required
      />
      <div className={styles.wrapPhoto}>
        <label
          className={styles.label}
          htmlFor='photo'
          onMouseLeave={handleHover}
          onMouseEnter={handleHover}
        >
          <img src={image} alt='' className={styles.photo} />
          <span className={`${styles.button} ${isVisible 
            ? styles.buttonDefault 
            : styles.buttonActive}`}>
            <img src={camera}/>
          </span>
        </label>
      </div>
    </div>
  );
};
