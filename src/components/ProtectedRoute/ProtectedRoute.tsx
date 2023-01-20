import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { FC, ReactNode } from 'react';

export const ProtectedRoute: FC<RouteProps & {children?: ReactNode}> = ({ children, ...rest }) => {
  //TODO: скорей всего сюда же надо запихнуть проверку пользователь является куратором или нет, если он куратор переход на страницу /admin
    const user = localStorage.getItem('user');
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