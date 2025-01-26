import React from 'react';
import Carasol from '../Pages/Carosol';

const Home = () => {
  return (
    <div>
      {/* Carousel Section */}
      <Carasol />

      {/* CRUD Theory Section */}
      <div className="container mt-5">
        <h2 className="text-center">CRUD Operations</h2>
        <p className="mt-4">
          CRUD stands for the four basic operations that can be performed on
          data in an application or database:
        </p>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Create:</strong> Add new data or records to the database.
            For example, adding a new user or product.
          </li>
          <li className="list-group-item">
            <strong>Read:</strong> Retrieve or view data from the database. This
            could be viewing a list of all users or a specific product's
            details.
          </li>
          <li className="list-group-item">
            <strong>Update:</strong> Modify or edit existing data. For example,
            updating a user's profile information.
          </li>
          <li className="list-group-item">
            <strong>Delete:</strong> Remove data or records from the database.
            For instance, deleting a user or removing a product.
          </li>
        </ul>
        <p className="mt-4">
          CRUD operations are fundamental to most web and mobile applications,
          enabling users to interact with and manage data effectively.
        </p>
      </div>
    </div>
  );
};

export default Home;
