import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { updateProfileHook } from "../hooks/updateProfile";
import Loader from "../components/loader";
import { useSelector } from "react-redux";

function Profile() {
  const { auth } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [name, setName] = useState(auth.name || "");
  const [imageBase64, setImageBase64] = useState(null);
  const { updateProfile, error, loading } = updateProfileHook();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(auth.id, imageBase64, name, password, setName, setPassword);
  };
  return (
    <div>
      {loading && <Loader />}
      <Container>
        <h2 className="form-header"> Update Credentials </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <button className="form-btn" type="submit">
            Save
          </button>

          {error && <div className="error">Error: {error}</div>}
        </Form>
      </Container>
    </div>
  );
}

export default Profile;
