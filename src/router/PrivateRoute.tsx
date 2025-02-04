import { createBrowserRouter, Navigate } from "react-router-dom";
import { PrivateLayout } from "./layouts/private/PrivateLayout";
import { ImageSearch } from "../pages/private/image-search/ImageSearch";
import { Error404 } from "../pages/shared/errors/Error404";
import { UserInformation } from "../pages/private/user-information/UserInformation";
import { ChangePassword } from "../pages/private/change-password/ChangePassword";
import { ProtectRoute } from "./functions/ProtectRoute";


export const BuildPrivateRoutes = createBrowserRouter([
    {
        path: '/',
        element: <PrivateLayout />,
        children: [
            { index: true, element: <Navigate to="/images" replace /> },
            {
                path: 'images',
                element: <ProtectRoute allowedRoles={[1]} roleContent={{ 1: <ImageSearch /> }} />
            },
            {
                path: 'profile',
                element: <ProtectRoute allowedRoles={[1]} roleContent={{ 1: <UserInformation /> }} />
            },
            {
                path: 'change-password',
                element: <ProtectRoute allowedRoles={[1]} roleContent={{ 1: <ChangePassword /> }} />
            },
            { path: '*', element: <Error404 /> }
        ]
    }
]);