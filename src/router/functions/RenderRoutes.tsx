import { Route } from "react-router-dom";
import { ProtectRoute } from "./ProtectRoute";
import { validsRols } from "../../context/auth-context";

export interface RenderRoute {
    path: string;
    allowedRoles: validsRols[];
    roleContent: Record<number, JSX.Element>;
    subRoutes?: RenderRoute[];
}

export const RenderRoutes = (routes: RenderRoute[]) => {
    return routes.map(({ path, allowedRoles, roleContent, subRoutes }) => (
        <Route key={path} path={path}>
            <Route index element={<ProtectRoute allowedRoles={allowedRoles} roleContent={roleContent} />} />
            {subRoutes && RenderRoutes(subRoutes)}
        </Route>
    ));
};