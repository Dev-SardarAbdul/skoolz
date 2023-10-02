import { useState } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";

export const enrollUserHook = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.auth);

  const enrollUser = async (id, isEnrolled) => {
    setLoading(true);

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isEnrolled: true }),
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
    }
  };

  return { error, loading, enrollUser };
};
