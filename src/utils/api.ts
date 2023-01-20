import { BaseFiedsRaw, InfoItemsRaw, ProfileRaw, TGetCommentsRaw, TGetProfilesRaw, TGetUsersRaw, TUserReactionsRaw, UserAccountRaw, UserWithProfileRaw } from "../services/types/types";

//тестовый токен
export const token = 'wertyu45678cfgh567'
//проверка ответа от сервера
const checkResponse = <T>(res: Response, readBody: boolean = true):Promise<T | void> => {
  if (res.ok) {
    if (readBody){    
      return res.json(); 
    }
    else{
      return Promise.resolve();
    }
  }
  return Promise.reject(
    new Error(`Произошла ошибка со статус-кодом ${res.status}`)
  );
};
const response_type='code';
const client_id ='e0363480e511432f87948725fe869e7f';
const redirect_uri = 'http%3A%2F%2Flocalhost%3A3000%2Flogin';
//получение jwt 
export const GetJWTToken = async() =>{
  return fetch(`https://oauth.yandex.ru/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`,)
}
//универсальная функция запроса с проверкой
const request = <T>(url: string, options: RequestInit, readBody: boolean = true): Promise<T | void> => {
  return fetch(url, options).then(res => checkResponse<T>(res, readBody))
}
//TODO: надо разобраться с типами


//запрос всех пользователей
export const getUsers = async() => {
  return request<TGetUsersRaw>('/users', {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};
//отправка пользователя
export const postUser = async(email: string, cohort: string) =>{
  return request<BaseFiedsRaw & UserAccountRaw & {name: string}>('/users', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token },
      body: JSON.stringify({
          'email': email,
          'cohort': cohort
      }),
    })
}
//изменение пользователя //id: the user id
export const putUser = async(email: string, cohort: string, _id: string) =>{
  return request<BaseFiedsRaw & UserAccountRaw & {name: string}>(`/users/${_id}`, {
    method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token },
      body: JSON.stringify({
          'email': email,
          'cohort': cohort
      }),
    })
}
//получение комментариев
export const getComments = async() => {
  return request<TGetCommentsRaw>('/comments', {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};

//удаление комментария //id: user.reactions[]._id
export const deleteComment = async(_id: string) => {
  return request(`/comments/${_id}`, {
    headers: {'Content-Type': 'text/plain', 'Authorization' : 'Bearer ' + token},
    method: "DELETE",
  }, false);
};

//запрос профилей - по умолчанию возвращают профили из той же когорты, что и запрошенный пользователь, или ничего
export const getProfiles = async() => {
  return request<TGetProfilesRaw>('/profiles', {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};

//запрос профиля пользователя _id: the user id
export const getUserProfile = async(_id: string) => {
  return request<BaseFiedsRaw & UserWithProfileRaw & {reactions: number}>(`/profiles/${_id}`, {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};
//изменение профиля пользователя //id: the user id
export const patchUserProfile = async(_id: string, data: {profile: ProfileRaw, info: InfoItemsRaw}) =>{
  return request<BaseFiedsRaw & UserWithProfileRaw & {reactions: number}>(`/profiles/${_id}`, {
    method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token },
      body: JSON.stringify({
        data
      }),
    })
}
//получение реакций профиля пользователя //id: the user id
export const getUserReactions = async(_id: string) => {
  return request<TUserReactionsRaw>(`/profiles/${_id}/reactions`, {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};
//отправка реакций профиля пользователя //id: the user id
export const postUserReactions = async(_id: string, comment: {target: string, text: string} | {target: string, emotion: string}) => {
  return request<TUserReactionsRaw>(`/profiles/${_id}/reactions`, {
    headers: {'Content-Type': 'text/plain', 'Authorization' : 'Bearer ' + token},
    method: "POST",
    body: JSON.stringify({
      comment
    })
  }, false);
};

