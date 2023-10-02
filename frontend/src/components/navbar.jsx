import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import skoolz from "../assets/skoolz.png";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <Image src={skoolz} height={100} className="nav-img" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"></Nav>
            {!auth ? (
              <div className="btn-div">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
              </div>
            ) : (
              <div className="btn-div">
                <p
                  className="email-text"
                  style={{ textTransform: "capitalize" }}
                >
                  <strong> {auth.name}</strong>
                </p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Topbar;
