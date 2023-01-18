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

//универсальная функция запроса с проверкой
const request = <T>(url: string, options: RequestInit, readBody: boolean = true): Promise<T | void> => {
  return fetch(url, options).then(res => checkResponse<T>(res, readBody))
}
//TODO: надо разобраться с типами
type InfoItem = {
  text?: string,
  image?: string,
}
type InfoBlock = {
  $ref: InfoItem,
  reactions?: number
}

// type Reaction = {
//   _id: string,
//   from:{
//     $ref: ,
//   }
//   target: string
// }
///
type TGetUsersRaw = {
  total: number,
  items: Array<TUserRaw>
}
type TUserRaw = {
  _id: string,
  createdAt: number,
  updatedAt: number,
  email:string,
  cohort:string,
  name:string
};
type TCommentRaw = {
  text: string,
  _id: string,
  from: {
    value: string
  },
  target: string, //это поле отвечает за то на что дали комментарий
  to: {
    _id: string,
    name: string,
    email: string
  }
}
type TUserReactionRaw = {
  emotion?: string,
  text?: string,
  _id?: string,
  from: {
    value: string
  },
  target: string
}
type TUserReactionsRaw = {
  total: number,
  items: Array<TUserReactionRaw>
}
type TGetCommentsRaw = {
    total: number,
    items: Array<TCommentRaw>,
}
type TProfileRaw = {
  email: string,
  cohort: string,
  _id: string,
  createdAt: number,
  updatedAt: number,
  profile: {
    name: string,
    photo: string,
    city: {
      name: string,
      geocode: [
        number,
        number
      ]
    }
  }
}
type TProfilesRaw = {
  total: number,
  items: Array<TProfileRaw>
}
export type TUserProfileRaw = {
    email: string,
    cohort: string,
    _id: string,
    createdAt: number,
    updatedAt: number,
    profile: {
      name: {
        value: string
      },
      photo: {
        value: string
      },
      city: {
        value: string
      },
      birthday: string,
      quote: string,
      telegram: string,
      github: string,
      template: string
    },
    info: {
      hobby: {
        value: string
      },
      status: {
        value: string
      },
      job: {
        value: string
      },
      edu: {
        value: string
      }
    },
    reactions: number
}
//запрос всех пользователей
export const getUsers = async() => {
  return request<TGetUsersRaw>('/users', {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};
//отправка пользователя
export const postUser = async(email: string, cohort: string) =>{
  return request<TUserRaw>('/users', {
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
  return request<TUserRaw>(`/users/${_id}`, {
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
  return request<TProfilesRaw>('/profiles', {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};

//запрос профиля пользователя _id: the user id
export const getUserProfile = async(_id: string) => {
  return request<TUserProfileRaw>(`/profiles/${_id}`, {
    headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token},
    method: "GET",
  });
};
//изменение профиля пользователя //id: the user id
//TODO: надо определиться как передавать данные и какие и тп
export const patchUserProfile = async(_id: string) =>{
  return request<TUserProfileRaw>(`/profiles/${_id}`, {
    method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token },
      body: JSON.stringify({
        "profile": {
          "name": "Ivan Ivanov",
          "photo": "https://placehold.co/600",
          "city": {
            "name": "blabla",
            "geocode": [
              55.73433517114847,
              37.59017466910319
            ]
          },
          "birthday": "1978-06-16",
          "quote": "cupidatat voluptate",
          "telegram": "Ut ullamco ex do sit",
          "github": "consequat nostrud",
          "template": "Ut aliqua dolore do"
        },
        "info": {
          "hobby": {
            "text": "",
            "image": null
          },
          "status": {
            "text": "",
            "image": null
          },
          "job": {
            "text": "",
            "image": null
          },
          "edu": {
            "text": "",
            "image": null
          }
        }
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
export const postUserReactions = async(_id: string, target: string, text: string) => {
  return request<TUserReactionsRaw>(`/profiles/${_id}/reactions`, {
    headers: {'Content-Type': 'text/plain', 'Authorization' : 'Bearer ' + token},
    method: "POST",
    body: JSON.stringify({
      "target": target,
      "text": text
    })
  }, false);
};

