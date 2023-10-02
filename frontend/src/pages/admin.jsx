import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUsersHook } from "../hooks/getUsers";
import { enrollUserHook } from "../hooks/enrollUsers";
import Loader from "../components/loader";

function Admin() {
  const { getUsers, error, loading } = getUsersHook();
  const { users } = useSelector((state) => state.user);

  const {
    enrollUser,
    error: enrollError,
    loading: enrollLoading,
  } = enrollUserHook();

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);

  const handleEnroll = async (id) => {
    await enrollUser(id);

    if (!enrollError) {
      getUsers();
    }
  };

  return (
    <div>
      {(enrollLoading || loading) && <Loader />}
      <Container className="mt-5">
        <h1 className="text-center">Welcome To Admin Screen!</h1>
        <div className="table-div">
          <Table striped bordered hover className="mt-5 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Application Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>{user?.name} </td>
                  <td>{user?.isEnrolled ? "Enrolled" : "Pending"} </td>
                  <td>{user?.createdAt.slice(0, 10)}</td>
                  <td>
                    {user?.isEnrolled ? (
                      "Already Enrolled"
                    ) : (
                      <button
                        className="table-btn"
                        onClick={() => handleEnroll(user._id)}
                        disabled={enrollLoading}
                      >
                        Enroll
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {(error || enrollError) && (
            <div className="error">Error:{error || enrollError}</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Admin;
