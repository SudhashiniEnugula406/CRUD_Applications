import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const getUserApi = "http://localhost:3000/user";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`${getUserApi}/${id}`) // Concatenate the ID to the API endpoint
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditUser;
