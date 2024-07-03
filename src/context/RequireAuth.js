// RequireAuth.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();

    if (auth === null) {
        // If auth is null, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If auth is not null, render child routes
    return <Outlet />;
};

export default RequireAuth;
