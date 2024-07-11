import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();

    if (!auth || Object.keys(auth).length === 0) {
        // If auth is empty, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If auth is not empty, render child routes
    return <Outlet />;
};

export default RequireAuth;
