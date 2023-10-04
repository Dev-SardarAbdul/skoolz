import { useState } from "react";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const signupHook = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const handleCreateUser = async (
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword
  ) => {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setError(null);
      dispatch(setUser(data));
      setEmail("");
      setName("");
      setPassword("");
      setMessage("Verification email has been sent, please check your mail!");
    }
  };

  return { handleCreateUser, error, message };
};
