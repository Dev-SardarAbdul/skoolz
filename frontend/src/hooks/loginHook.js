import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ToastComp from "../components/toast";

export const loginHook = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
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
      navigate("/");
    }
  };

  return { error, handleLogin };
};
