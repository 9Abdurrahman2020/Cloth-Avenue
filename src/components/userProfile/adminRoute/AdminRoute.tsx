import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';

const AdminRoute = ({children}:{children:JSX.Element}) => {
    let  {adminLoading, role} = useAuth();
    let location = useLocation();
  if(adminLoading){
    return <div className="loading-image-container">
                <img width="200px" src="https://cdn.dribbble.com/users/408943/screenshots/2887008/media/5292aff30094d74fffd87a0dba58fa4e.gif"></img>
            </div>
  }
  if(role === 'admin'){
      return children;
  }
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;