import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Admin from "./pages/admin";
import Learning from "./pages/learningPath";
import PrivateRoute from "./components/privateRoutes/privateRroute";
import AdminRoute from "./components/privateRoutes/adminRoute";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route
            path="/learning"
            element={
              auth && auth.isEnrolled ? (
                <Learning />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="" element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route
            path="/login"
            element={auth ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={auth ? <Navigate to="/" replace /> : <Signup />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
