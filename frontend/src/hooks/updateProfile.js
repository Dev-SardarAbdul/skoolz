import { useState } from "react";
import { BASE_URL } from "../constants";
import { setUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const updateProfileHook = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updateProfile = async (
    id,
    image,
    name,
    password,
    setName,
    setPassword
  ) => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/profile/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ image, name, password }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
    }

    if (response.ok) {
      setError(null);
      setLoading(false);
      dispatch(setUser(data));
      setName("");
      setPassword("");
    }
  };

  return { updateProfile, error, loading };
};
