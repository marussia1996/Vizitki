import React, {FC} from 'react';
import css from './PageLoading.module.css';
import Loader from "../Loader/Loader";

const PageLoading: FC = () => {
  return (
    <div className={css.container}>
      <Loader/>
    </div>
  );
};

export default PageLoading;