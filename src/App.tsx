import { RouterProvider } from "react-router-dom";
import { BuildPrivateRoutes } from "./router/PrivateRoute";
import { BuildPublicRoutes } from "./router/PublicRoute";
import { AuthProvider, useAuthContext } from "./context/auth-context";
import { LoadingProvider } from "./context/loading-context";


const AppContent = () => {
  const { session } = useAuthContext();

  return <RouterProvider router={session ? BuildPrivateRoutes : BuildPublicRoutes} />;

}

export const App = () => {
  return (
    <AuthProvider >
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </AuthProvider>
  )
}
