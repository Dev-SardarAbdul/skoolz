import { useState } from "react";
import { BASE_URL } from "../constants";
import { useSelector } from "react-redux";

export const verifyHook = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.auth);

  const handleVerify = async (id) => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/verify/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth?.token}`,
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

  return { handleVerify, error, loading };
};
