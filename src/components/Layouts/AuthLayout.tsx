import React, {FC, Suspense} from 'react';
import {Await, useLoaderData, useOutlet} from 'react-router-dom';
import {AuthProvider} from "../../services/AuthContext";
import Loading from "../../shared/Loading/Loading";

const AuthLayout: FC = () => {

  const outlet = useOutlet();

  const {getData} = useLoaderData() as { getData: Promise<any> };

  console.log(getData);

  return (
    <Suspense fallback={<Loading/>}>
      <Await
        resolve={getData}
        errorElement={<p>Error while loading page</p>}
        children={({user, token, role}) => (
          <AuthProvider userData={user} roleData={role} tokenData={token}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};

export default AuthLayout;