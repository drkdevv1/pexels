import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth-context';

export const PrivateLayout = () => {
    const { session } = useAuthContext();

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <div className="flex-grow overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};