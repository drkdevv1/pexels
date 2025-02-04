import { Navigate } from "react-router-dom";
import { useAuthContext, validsRols } from "../../context/auth-context";

interface Props {
    allowedRoles: validsRols[];
    roleContent: Record<number, JSX.Element>;
}

export function ProtectRoute({ allowedRoles, roleContent }: Props) {
    const { session } = useAuthContext();

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // All logged users have role 1
    const userRole = 1 as validsRols;

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/error-404" replace />;
    }

    return roleContent[userRole] || <Navigate to="/error-404" replace />;
}