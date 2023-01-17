//просто чтобы папка появилась
export const baseUrl: string = "https://visitki.practicum-team.ru/api";
export const token = 'wertyu45678cfgh567`'
//проверка ответа от сервера
const checkResponse = <T>(res: Response):Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    new Error(`Произошла ошибка со статус-кодом ${res.status}`)
  );
};
//универсальная функция запроса с проверкой
const request = <T>(url: string, options: RequestInit): Promise<T> => {
  return fetch(url, options).then(res => checkResponse<T>(res))
}
type TUserRaw = {
  _id: string,
  createdAt: number,
  updatedAt: number,
  email: string,
  cohort: string,
  name: string
}
type TGetUsersRaw = {
  total: number,
  items: Array<TUserRaw>
}
//запрос данных
export const getUsers = async() => {
  return request<TGetUsersRaw>(`${baseUrl}/users`, {
    headers: { "Content-Type": "application/json", 'Authorization': token },
    method: "GET",
  });
};