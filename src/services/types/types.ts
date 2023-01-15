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

export enum TButtonView {
  LARGE = 'buttonLarge',
  SMALL = 'buttonSmall',
}

export enum TThemeProfile {
  DEFAULT = 'default',
  ROMANTIC = 'romantic',
  DARING = 'daring'
} 
export type TPageType = 'default' | 'romantic' | 'daring';

