import React, {FC} from 'react';
import Loading from "../Loading/Loading";
import ShowError from "../ShowError/ShowError";

type TFetchingProps = {
  isLoading: boolean,
  error: string,
  children?: React.ReactNode;
}

const Fetching: FC<TFetchingProps> = ({isLoading, error, children}) => {
  if (isLoading) {
    return (<Loading/>)
  }

  if (error) {
    return (<ShowError error={error}/>)
  }

  return (
    <>
      {children}
    </>
  )
};

export default Fetching;