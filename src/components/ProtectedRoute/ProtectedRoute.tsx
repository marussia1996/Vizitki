import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { FC, ReactNode } from 'react';

export const ProtectedRoute: FC<RouteProps & {children?: ReactNode}> = ({ children, ...rest }) => {
  //TODO: надо исправить то откуда берется значение зареган пользователь или нет
  //TODO: скорей всего сюда же надо запихнуть проверку пользователь является куратором или нет, если он куратор переход на страницу /admin
    const user = 'ghjk';
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={
                () => (user ? (children) : (
                    <Redirect to={{
                        pathname: `/login`,
                        state: { from: location },
                    }}
                    />
                ))
            }
        />
    );
};