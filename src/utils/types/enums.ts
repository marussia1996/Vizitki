import {TThemeProfile} from "../../services/types/types";

const themeProfileDescription: Record<TThemeProfile, string> = {
  [TThemeProfile.DEFAULT]: 'Серьезный',
  [TThemeProfile.DARING]: 'Дерзкий',
  [TThemeProfile.ROMANTIC]: 'Романтический'
}

export const themeToDescription = <T extends TThemeProfile | string>(theme: T): string => {
  return themeProfileDescription[theme as TThemeProfile];
}

export const numberEntries = (value: any) => Object.values(value).filter((x) => !Number.isNaN(Number(x))).map((x) => Number(x));
export const stringEntries = (value: any) => Object.values(value).map((x) => String(x));