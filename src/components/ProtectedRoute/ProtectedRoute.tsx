import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { FC, ReactNode, useContext } from 'react';
import { AuthContext } from '../../services/AuthContext';

export const ProtectedRoute: FC<RouteProps & {children?: ReactNode, role?: string}> = ({ children, role, ...rest }) => {
    const {user} = useContext(AuthContext);
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