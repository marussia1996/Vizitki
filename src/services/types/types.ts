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
  DEFULT = 'defult',
  ROMANTIC = 'romantic',
  DARING = 'daring'
} 