import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { auth } = useSelector((state) => state.auth);

  return auth && auth.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AdminRoute;
