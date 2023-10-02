import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { loginHook } from "../hooks/loginHook";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { handleLogin, error } = loginHook();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  return (
    <div>
      <Container>
        <h2 className="form-header"> Login </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <p className="form-sub-text">
            Don't have an account?
            <Link to="/signup" style={{ color: "#fff" }}>
              {" "}
              Signup here
            </Link>
          </p>

          <button className="form-btn" type="submit">
            Login
          </button>

          {error && <div className="error">Error: {error}</div>}
        </Form>
      </Container>
    </div>
  );
}

export default Login;
