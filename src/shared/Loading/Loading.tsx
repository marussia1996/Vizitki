import React, {FC} from 'react';
import css from './Loading.module.css';
import Loader from "../../components/Loader/Loader";

const Loading: FC = () => {
  return (
    <div className={css.container}>
      <Loader/>
    </div>
  );
};

export default Loading;