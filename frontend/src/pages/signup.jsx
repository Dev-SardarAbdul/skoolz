import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { signupHook } from "../hooks/signUpHook";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { handleCreateUser, error, message } = signupHook();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreateUser(name, email, password, setName, setEmail, setPassword);
  };

  return (
    <div>
      <Container>
        <h2 className="form-header"> Signup </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <p className="form-sub-text">
            Already have an account?
            <Link to="/login" style={{ color: "#fff" }}>
              {" "}
              Login here
            </Link>
          </p>

          <button className="form-btn" type="submit">
            Signup
          </button>

          {error && <div className="error">Error: {error}</div>}
          {message && <div className="message">Success: {message}</div>}
        </Form>
      </Container>
    </div>
  );
}

export default Signup;
