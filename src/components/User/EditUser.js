import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = "http://localhost:3000/user";

  // Fetch the user data when the component is mounted
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`${getUserApi}/${id}`);
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to fetch user data");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${getUserApi}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status}`);
      }

      const data = await response.json();
      console.log("User updated successfully:", data);
      setIsLoading(false);
      navigate("/show-user"); // Navigate back to the user listing page
    } catch (err) {
      console.error("Error updating user:", err.message);
      setError("Failed to update user. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p className="error-message">Error: {error}</p>}
        <p>Edit User</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
