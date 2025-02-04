import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { RenderRoute, RenderRoutes } from "./functions/RenderRoutes";
import { PrivateLayout } from "./layouts/private/PrivateLayout";
import { ImageSearch } from "../pages/private/image-search/ImageSearch";
import { Error404 } from "../pages/shared/errors/Error404";
import { UserInformation } from "../pages/private/user-information/UserInformation";
import { ChangePassword } from "../pages/private/change-password/ChangePassword";

const privateRoutes: RenderRoute[] = [
    {
        path: "images",
        allowedRoles: [1],
        roleContent: { 1: <ImageSearch /> }
    },
    {
        path: "profile",
        allowedRoles: [1],
        roleContent: { 1: <UserInformation /> }
    },
    {
        path: "change-password",
        allowedRoles: [1],
        roleContent: { 1: <ChangePassword /> }
    }
];

export const BuildPrivateRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<PrivateLayout />}>
            <Route index element={<Navigate to="/images" />} />
            {RenderRoutes(privateRoutes)}
            <Route path="*" element={<Error404 />} />
        </Route>
    )
);