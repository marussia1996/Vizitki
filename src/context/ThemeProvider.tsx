import React, {createContext, FC, useState} from "react";
import {TThemeProfile} from "../services/types/types";

export type TThemeContext = {
  theme: TThemeProfile,
  setTheme: (theme: TThemeProfile) => void;
}

export const ThemeContext = createContext<TThemeContext>({theme: TThemeProfile.DEFAULT, setTheme: ()=>{}});

const ThemeProvider: FC<{ children: React.ReactNode }> = ({children}) => {

  const [theme, setTheme] = useState<TThemeProfile>(TThemeProfile.DEFAULT);

  return <ThemeContext.Provider value={{theme, setTheme}}>
    {children}
  </ThemeContext.Provider>
};

export default ThemeProvider;