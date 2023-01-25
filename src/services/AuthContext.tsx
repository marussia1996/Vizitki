import React, { FC, ReactNode, useState } from 'react'
export type TUser= {
  _id: string,
  email: string,
  name: string,
  cohort: string, 
  image: string,
  tags: string
};
export type TAuthContext = {
  user: TUser | null,
  setUser: (user: TUser | null)=>void,
}
export const AuthContext = React.createContext<TAuthContext>({user: null , setUser: ()=>{}});
export const AuthProvider: FC <{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<TUser | null>(null);
  return (
    <AuthContext.Provider value={{user: user, setUser: setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
