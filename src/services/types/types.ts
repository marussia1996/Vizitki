//

import { ReactNode } from "react";

    //TUserRaw - пишем постфикс Raw у данных пришедших от сервера

//

export type TLocation = {
  hash: string;
  pathname: string;
  search: string;
  state: object;
  from?: string;
  background: {
      pathname: string;
      search: string;
      hash: string;
      state: null;
      key: string;
  }
};

export type TButtonProps = {
  children: ReactNode;
  className: 'buttonLarge' | 'buttonSmall';
  disabled: boolean;
  onClick: ()=>void;
}

export type TUserInfoProps = {
  userName: string;
  city: string;
  telegram?: string; 
  github?: string;
}