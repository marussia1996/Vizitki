import {getFromLocalStorage} from "./localStorage";
import {TToken} from "../services/AuthContext";
import {LocalStorageKeys} from "../services/types/types";

const response_type = 'token';
const client_id = 'e0363480e511432f87948725fe869e7f';
//функция проверки истек ли токен
export const expiredToken = (accessTokenTimeRefresh: string) => {
  return Math.floor(new Date().getTime() / 1000) > Number(accessTokenTimeRefresh)
}
//клик по кнопке перенаправляет на страницу регистрации через яндекс
export const redirectToYandex = (redirectUri: string) => {
  window.location.assign(`https://oauth.yandex.ru/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirectUri}`);
}
//функция проверки авторизован ли пользователь
export const getUserToken = (): string | null => {
  const tokenInfo = getFromLocalStorage<TToken>(LocalStorageKeys.Token);
  if (tokenInfo === null || expiredToken(tokenInfo.expired)) {
    localStorage.removeItem(LocalStorageKeys.Token);
    return null;
  }
  return tokenInfo.token;
}