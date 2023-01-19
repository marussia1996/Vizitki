import {useContext} from "react";
import {ThemeContext, TThemeContext} from "../../context/ThemeProvider";

export const useTheme = (): TThemeContext => {
  const {theme, setTheme} = useContext(ThemeContext);
  return {theme, setTheme};
}