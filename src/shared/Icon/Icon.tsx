import React, {FC} from 'react';

type TIconProps = {
  path: string,
  width?: string,
  height?: string,
  className?: string,
  stroke?: string,
  fill?: string
}

const Icon:FC<TIconProps> = ({width = '16px', height= '16px', path, fill='currentColor', stroke='currentColor'}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} // added size here
      height={height} // added size here
      fill={fill}
      stroke={stroke}
    >
      <path d={path}  fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  );
};

export default Icon;
