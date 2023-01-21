const response_type='token';
const client_id ='e0363480e511432f87948725fe869e7f';
const redirect_uri = 'http%3A%2F%2Flocalhost%3A3000%2Flogin';
const client_secret = '164de9d6956b453a8bf09998aa50220d';
//функция проверки истек ли токен
export const expiredToken = (accessTokenTimeRefresh: string) =>{
  return Math.floor(new Date().getTime() / 1000) > Number(accessTokenTimeRefresh)
}
//клик по кнопке перенаправляет на страницу регистрации через яндекс
export const redirectToYandex = () =>{
  window.location.assign(`https://oauth.yandex.ru/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`);
}
//функция проверки авторизован ли пользователь
export const getUserToken = () =>{
  const accessTokenTimeRefresh = localStorage.getItem('accessTokenTimeRefresh');
  const accessToken = localStorage.getItem('accessToken');
  if(accessTokenTimeRefresh === null || expiredToken(accessTokenTimeRefresh) || accessToken === null){
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenTimeRefresh');
    // localStorage.clear();
    return null
  }else{
    return accessToken;
  }
}