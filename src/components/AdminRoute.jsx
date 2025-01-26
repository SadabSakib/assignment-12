import React, { useContext } from 'react';
import useAdmin from './hooks/useAdmin';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
  // const navigate=useNavigate()
    const {loading,user}=useContext(AuthContext)
    const [isAdmin, isPending] = useAdmin()
    const location = useLocation()
    
      if (loading || isPending) {
        return <span className="loading loading-spinner loading-lg"></span>;
        
      }
        if (!user || !isAdmin) {
          return <Navigate to="/" state={{from:location}} replace></Navigate>;
        }
        return <div>{children}</div>;
};

export default AdminRoute;