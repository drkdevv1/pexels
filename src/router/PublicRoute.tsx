import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Register } from "../pages/public/register/Register";
import { Login } from "../pages/public/login/Login";



export const BuildPublicRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route path='/' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Route>
    )
)