import {
  BaseFiedsRaw,
  InfoItemsRaw,
  ProfileRaw,
  TGetCommentsRaw,
  TGetProfilesRaw,
  TGetUsersRaw,
  TUserReactionsRaw,
  UserAccountRaw,
  UserWithProfileRaw
} from "../services/types/types";
import {getUserToken} from "./auth";

//проверка ответа от сервера
const checkResponseJson = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    new Error(`Произошла ошибка со статус-кодом ${res.status}`)
  );
};
const checkResponseText = (res: Response, readBody: boolean = true): Promise<string> => {
  if (res.ok) {
    return res.text();
  }
  return Promise.reject(
    new Error(`Произошла ошибка со статус-кодом ${res.status}`)
  );
};


const token = getUserToken();

//not универсальная функция запроса с проверкой
const requestJson = <T>(url: string, options: RequestInit): Promise<T> => {
  options.headers = {...options.headers, 'Authorization': 'Bearer ' + token}
  return fetch(url, options).then(res => checkResponseJson<T>(res))
}
const requestText = (url: string, options: RequestInit): Promise<string> => {
  options.headers = {...options.headers, 'Authorization': 'Bearer ' + token}
  return fetch(url, options).then(res => checkResponseText(res))
}

//запрос всех пользователей
export const getUsers = async () => {
  return requestJson<TGetUsersRaw>('/users', {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};
//отправка пользователя
export const postUser = async (email: string, cohort: string) => {
  return requestJson<BaseFiedsRaw & UserAccountRaw & { name: string }>('/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'email': email,
      'cohort': cohort
    }),
  })
}
//изменение пользователя //id: the user id
export const putUser = async (email: string, cohort: string, _id: string) => {
  return requestJson<BaseFiedsRaw & UserAccountRaw & { name: string }>(`/users/${_id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'email': email,
      'cohort': cohort
    }),
  })
}
//получение комментариев
export const getComments = async () => {
  return requestJson<TGetCommentsRaw>('/comments', {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};

//удаление комментария //id: user.reactions[]._id
export const deleteComment = async (_id: string) => {
  return requestText(`/comments/${_id}`, {
    headers: {'Content-Type': 'text/plain'},
    method: "DELETE",
  });
};

//запрос профилей - по умолчанию возвращают профили из той же когорты, что и запрошенный пользователь, или ничего
export const getProfiles = async () => {
  return requestJson<TGetProfilesRaw>('/profiles', {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};

//запрос профиля пользователя _id: the user id
export const getUserProfile = (_id: string) => {
  return requestJson<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>(`/profiles/${_id}`, {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  }) as Promise<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>;
};
//изменение профиля пользователя //id: the user id
export const patchUserProfile = async (_id: string, data: { profile: ProfileRaw, info: InfoItemsRaw }): Promise<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }> => {
  return requestJson<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>(`/profiles/${_id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      data
    }),
  })
}
//получение реакций профиля пользователя //id: the user id
export const getUserReactions = async (_id: string) => {
  return requestJson<TUserReactionsRaw>(`/profiles/${_id}/reactions`, {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};
//отправка реакций профиля пользователя //id: the user id
export const postUserReactions = async (_id: string, comment: { target: string, text: string } | { target: string, emotion: string }) => {
  return requestText(`/profiles/${_id}/reactions`, {
    headers: {'Content-Type': 'text/plain'},
    method: "POST",
    body: JSON.stringify({
      comment
    })
  });
};

