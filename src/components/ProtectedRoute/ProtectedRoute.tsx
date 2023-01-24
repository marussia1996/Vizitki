import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { FC, ReactNode } from 'react';

export const ProtectedRoute: FC<RouteProps & {children?: ReactNode, role?: string}> = ({ children, role, ...rest }) => {
    const user = localStorage.getItem('user');
    // const userInfo = user && JSON.parse(user);
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={
                () => (

                      user ? (children) :
                      (
                        <Redirect to={{
                            pathname: `/login`,
                            state: { from: location },
                        }}
                        />
                      )
                )
            }
        />
    );
};