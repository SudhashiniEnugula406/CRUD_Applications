
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import './User.css';

const CreateUser = () => {
    const navigate = useNavigate();
    const createUserApi = "http://localhost:3000/user"; // Replace with your actual API URL
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Handle input changes
    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    // Form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!user.name || !user.email || !user.phone) {
            setError("All fields are required.");
            return;
        }

        try {
            setIsLoading(true);
            setError(null); // Clear previous errors

            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const responseData = await response.json(); // Parse the JSON response

            if (response.ok) {
                console.log('Form submitted successfully!', responseData);
                setUser({ name: "", email: "", phone: "" }); // Reset the form
                navigate('/show-user'); // Redirect to another page
            } else {
                console.error('Form submission failed:', responseData);
                setError(responseData.message || 'An error occurred while submitting the form.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError('Unable to connect to the server. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="user-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p className="error-message">Error: {error}</p>}
                <p>User Form</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
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
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
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
                    <label htmlFor="phone" className="form-label">Phone</label>
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
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;

