import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { auth } = useSelector((state) => state.auth);

  return auth && auth.isVerified ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default PrivateRoute;
