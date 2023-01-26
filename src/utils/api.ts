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
  options.headers = {...options.headers,'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
  return fetch(url, options).then(res => checkResponseJson<T>(res))
}
const requestText = (url: string, options: RequestInit): Promise<string> => {
  options.headers = {...options.headers, 'Content-Type': 'text/plain', 'Authorization': 'Bearer ' + token}
  return fetch(url, options).then(res => checkResponseText(res))
}

//запрос всех пользователей
export const getUsers = async () => {
  return requestJson<TGetUsersRaw>('/users', {
    method: "GET",
  });
};
//отправка пользователя
export const postUser = async (email: string, cohort: string) => {
  return requestJson<BaseFiedsRaw & UserAccountRaw & { name: string }>('/users', {
    method: 'POST',
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
    body: JSON.stringify({
      'email': email,
      'cohort': cohort
    }),
  })
}
//получение комментариев
export const getComments = async () => {
  return requestJson<TGetCommentsRaw>('/comments', {
    method: "GET",
  });
};

//удаление комментария //id: user.reactions[]._id
export const deleteComment = async (_id: string) => {
  return requestText(`/comments/${_id}`, {
    method: "DELETE",
  });
};

//запрос профилей - по умолчанию возвращают профили из той же когорты, что и запрошенный пользователь, или ничего
export const getProfiles = () => {
  return requestJson<TGetProfilesRaw>('/profiles', {
    method: "GET",
  }) as Promise<TGetProfilesRaw>;
};

//запрос профиля пользователя _id: the user id
export const getUserProfile = (_id: string) => {
  return requestJson<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>(`/profiles/${_id}`, {
    method: "GET",
  }) as Promise<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>;
};
//изменение профиля пользователя //id: the user id
export const patchUserProfile = async (_id: string, data: { profile: ProfileRaw, info: InfoItemsRaw }): Promise<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }> => {
  return requestJson<BaseFiedsRaw & UserWithProfileRaw & { reactions: number }>(`/profiles/${_id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      data
    }),
  })
}
//получение реакций профиля пользователя //id: the user id
export const getUserReactions = async (_id: string) => {
  return requestJson<TUserReactionsRaw>(`/profiles/${_id}/reactions`, {
    method: "GET",
  });
};
//отправка реакций профиля пользователя //id: the user id
export const postUserReactions = async (_id: string, comment: { target: string, text: string } | { target: string, emotion: string }) => {
  return requestText(`/profiles/${_id}/reactions`, {
    method: "POST",
    body: JSON.stringify({
      comment
    })
  });
};

