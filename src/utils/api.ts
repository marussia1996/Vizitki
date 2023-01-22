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
const checkResponse = <T>(res: Response, readBody: boolean = true): Promise<T | void> => {
  if (res.ok) {
    if (readBody) {
      return res.json();
    } else {
      return Promise.resolve();
    }
  }
  return Promise.reject(
    new Error(`Произошла ошибка со статус-кодом ${res.status}`)
  );
};

const token = getUserToken();

//универсальная функция запроса с проверкой
const request = <T>(url: string, options: RequestInit, readBody: boolean = true): Promise<T | void> => {
  options.headers = {...options.headers, 'Authorization': 'Bearer ' + token}
  return fetch(url, options).then(res => checkResponse<T>(res, readBody))
}

//запрос всех пользователей
export const getUsers = async () => {
  return request<TGetUsersRaw>('/users', {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};
//отправка пользователя
export const postUser = async (email: string, cohort: string) => {
  return request<BaseFiedsRaw & UserAccountRaw & { name: string }>('/users', {
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
  return request<BaseFiedsRaw & UserAccountRaw & { name: string }>(`/users/${_id}`, {
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
  return request<TGetCommentsRaw>('/comments', {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};

//удаление комментария //id: user.reactions[]._id
export const deleteComment = async (_id: string) => {
  return request(`/comments/${_id}`, {
    headers: {'Content-Type': 'text/plain'},
    method: "DELETE",
  }, false);
};

//запрос профилей - по умолчанию возвращают профили из той же когорты, что и запрошенный пользователь, или ничего
export const getProfiles = () => {
  return request<TGetProfilesRaw>('/profiles', {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  }) as Promise<TGetProfilesRaw>;
};

//запрос профиля пользователя _id: the user id
export const getUserProfile = async (_id: string) => {
  return request<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>(`/profiles/${_id}`, {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};
//изменение профиля пользователя //id: the user id
export const patchUserProfile = async (_id: string, data: { profile: ProfileRaw, info: InfoItemsRaw }) => {
  return request<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>(`/profiles/${_id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      data
    }),
  })
}
//получение реакций профиля пользователя //id: the user id
export const getUserReactions = async (_id: string) => {
  return request<TUserReactionsRaw>(`/profiles/${_id}/reactions`, {
    headers: {'Content-Type': 'application/json'},
    method: "GET",
  });
};
//отправка реакций профиля пользователя //id: the user id
export const postUserReactions = async (_id: string, comment: { target: string, text: string } | { target: string, emotion: string }) => {
  return request<TUserReactionsRaw>(`/profiles/${_id}/reactions`, {
    headers: {'Content-Type': 'text/plain'},
    method: "POST",
    body: JSON.stringify({
      comment
    })
  }, false);
};

