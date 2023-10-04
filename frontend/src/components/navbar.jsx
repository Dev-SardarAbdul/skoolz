import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import skoolz from "../assets/skoolz.png";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { useState } from "react";
import { useEffect } from "react";
import user from "../assets/user.png";

function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdwon, setShowDropdown] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const { auth } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setShowDropdown(false);
    setImageSrc(null);
  };

  useEffect(() => {
    if (auth?.image) {
      setImageSrc(`data:image/*;base64,${auth?.image}`);
    }
  }, [auth?.image]);

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
            {auth && auth.isVerified ? (
              <div
                className="btn-div"
                style={{ position: "relative", minWidth: "200px" }}
              >
                <img
                  src={imageSrc || user}
                  alt="Image"
                  onClick={() => setShowDropdown(!showDropdwon)}
                  style={{ cursor: "pointer" }}
                  height={70}
                />

                {showDropdwon && (
                  <div className="dropdown-div">
                    <p
                      className="email-text"
                      style={{ textTransform: "capitalize" }}
                    >
                      Name:
                      <strong> {auth.name}</strong>
                    </p>

                    <button
                      className="profile-btn"
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                    >
                      Visit Profile
                    </button>
                    <button className="profile-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="btn-div">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Topbar;
