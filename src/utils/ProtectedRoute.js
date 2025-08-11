import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute=({ Children}) =>
{

    const token = localStorage.getItem('token');
    return token ? Children : <Navigate to ="/login"n/>
};

export default ProtectedRoute;