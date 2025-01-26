import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUser = () => {
  const showUserApi = "http://localhost:3000/user";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${showUserApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUser(user.filter((item) => item.id !== id)); // Update UI after deletion
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(showUserApi);
      setUser(response.data); // Assuming response.data is an array of users
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (user.length === 0 && !isLoading) {
    return <h1>No users found</h1>;
  }

  return (
    <div className="mt-5">
      {isLoading && <Loader />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    to={`/edit-user/${item.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                  </Link>
                  <Link
                    to={`/user/${item.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Show
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
