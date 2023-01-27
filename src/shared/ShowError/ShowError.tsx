import React, {FC} from 'react';
import css from './ShowError.module.scss';

type TErrorProps = {
  error: string;
}

const ShowError: FC<TErrorProps> = ({error}) => {
  return (
    <div className={css.error}>
      <p className={css.error__text}>{error}</p>
    </div>
  );
};

export default ShowError;