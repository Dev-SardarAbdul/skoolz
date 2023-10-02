import { useState } from "react";
import { BASE_URL } from "../constants";
import { setUsers } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const getUsersHook = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.auth);

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}`, {
      headers: {
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
      dispatch(setUsers(data));
      setLoading(false);
    }
  };

  return { error, loading, getUsers };
};
