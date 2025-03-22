import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials
  const hardcodedUsername = "admin";
  const hardcodedPassword = "admin123";

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username === hardcodedUsername && password === hardcodedPassword) {
      localStorage.setItem("adminToken", "hardcodedToken");
      alert("Login Successful!");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleAdminLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Username:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
