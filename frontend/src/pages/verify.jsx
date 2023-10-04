import React from "react";
import { Image } from "react-bootstrap";
import skoolz from "../assets/skoolz.png";
import { verifyHook } from "../hooks/verifyHook";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

function Verify() {
  const { handleVerify, error, loading } = verifyHook();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleVerify(id);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="verify-div">
        <Image src={skoolz} fluid />

        {!loading && (
          <>
            {error ? (
              <div className="error"> {error}</div>
            ) : (
              <>
                <h2>Congratulations!</h2>
                <p>
                  Your email has been verified <br /> successfully! Click{" "}
                  <span
                    style={{
                      color: "#000",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                  >
                    {" "}
                    here
                  </span>{" "}
                  to navigate to login page.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Verify;
