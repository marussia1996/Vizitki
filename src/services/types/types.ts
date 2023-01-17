//

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

export enum TThemeProfile {
  DEFAULT = 'default',
  ROMANTIC = 'romantic',
  DARING = 'daring'
} 
export type TPageType = 'default' | 'romantic' | 'daring';

export type TStudent = {
  id:string;
  number: number;
  email: string;
  name: string;
}

export type TUserInfoRaw = {
  _id: string;
  name: string;
  email: string;
}

export type TCommentRaw = {
  _id: string;
  from: TUserInfoRaw;
  target?: string | null;
  text: string;
  to: TUserInfoRaw;
}