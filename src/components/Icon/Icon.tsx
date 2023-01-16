import React, {FC} from 'react';

type TIconProps = {
  path: string,
  size: string,
  className?: string
}

const Icon:FC<TIconProps> = ({size, path}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size} // added size here
      height={size} // added size here
      fill={'currentColor'}
      stroke={'currentColor'}
    >
      <path d={path}/>
    </svg>
  );
};

export default Icon;