import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { auth } = useSelector((state) => state.auth);

  return (
    <div className="home-wrapper">
      <Container>
        <h2 className="home-header">Welcome To Skoolz!</h2>

        {auth.isEnrolled && auth.isAdmin ? (
          <>
            <p className="home-text">
              Hey admin, welcome to home . Click{" "}
              <Link to="/learning">here</Link> to view the learning path screen
              or click <Link to="/admin">here</Link> to go to admin route.
            </p>
          </>
        ) : (
          <p className="home-text">
            {!auth.isEnrolled && !auth.isAdmin ? (
              <span>
                Congrats, You're successfully logged in, you can continue
                learning once an admin has enrolled you.
              </span>
            ) : (
              <span>
                Welcome{" "}
                <strong style={{ textTransform: "capitalize" }}>
                  {" "}
                  {auth.name}
                </strong>
                , an admin has enrolled you. You can now start learning. Click{" "}
                <Link to="/learning">here</Link> to browse the learning path
                screen.
              </span>
            )}
          </p>
        )}
      </Container>
    </div>
  );
}

export default Home;
