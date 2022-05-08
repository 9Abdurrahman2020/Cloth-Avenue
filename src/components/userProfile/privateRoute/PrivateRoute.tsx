import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';

const PrivateRoute = ({children}:{children:JSX.Element}) => {
    let  {userLoading, user} = useAuth();
    let location = useLocation();
  if(userLoading){
    return <div className="loading-image-container">
                <img width="200px" src="https://cdn.dribbble.com/users/408943/screenshots/2887008/media/5292aff30094d74fffd87a0dba58fa4e.gif"></img>
            </div>
  }
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/user-profile/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;