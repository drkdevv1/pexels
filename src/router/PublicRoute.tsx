import { createBrowserRouter, Navigate } from "react-router-dom";

import { Register } from "../pages/public/register/Register";
import { Login } from "../pages/public/login/Login";



export const BuildPublicRoutes = createBrowserRouter([
    {
        path: '/',
        children: [
            { index: true, element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '*', element: <Navigate to="/login" replace /> }
        ]
    }
]);