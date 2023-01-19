import React, {createContext, FC, useState} from "react";

export type TAuthContext = {
  user: string | null,
  setUser: (user: string) => void;
}

export const AuthContext = createContext<TAuthContext>({user: null, setUser: ()=>{}});

const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {

  const [user, setUser] = useState<string | null>(null);

  return <AuthContext.Provider value={{user: user, setUser: setUser}}>
    {children}
  </AuthContext.Provider>
};

export default AuthProvider;