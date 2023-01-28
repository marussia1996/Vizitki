import {TUser} from "../services/AuthContext";
import {RoleType} from "../services/types/types";

export const parseAuthHash = (hash: string): { token: string, expired: string } | null => {
  const timeToken: RegExpMatchArray | null = hash.match(/expires_in=(\d+)/);
  //время на момент прихода токена
  const timeNow: number = Math.floor(new Date().getTime() / 1000);
  //через сколько токен надо обновлять
  const accessTokenTimeRefresh: string = String(timeToken && (Number(timeToken[1]) + Number(timeNow)));
  accessTokenTimeRefresh && localStorage.setItem('accessTokenTimeRefresh', accessTokenTimeRefresh);

  const accessToken = hash.match(/#access_token=([\w-]+)/);

  if (accessToken) {
    return {token: String(accessToken[1]), expired: accessTokenTimeRefresh};
  }

  return null;
}

export const fakeUser = (role: RoleType): TUser => {
  console.log(role);
  if (role === RoleType.Student) {
    return {
      _id: 'a18ca3c1e13dd93ddded5bbc',
      email: 'Caden5@yahoo.com',
      name: 'Shari Kassulke DDS',
      cohort: 'web+16',
      image: 'https://loremflickr.com/640/480/cats'
    }
  }
  return {
    _id: '2cb3baaa7528a9bb5e2c20d9',
    email: 'Chaim.Armstrong@gmail.com',
    name: 'Ricky Fadel',
    cohort: 'web+16',
    image: 'https://loremflickr.com/640/480/cats'
  }
}