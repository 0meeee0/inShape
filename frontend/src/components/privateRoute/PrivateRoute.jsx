import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.role !== "organizer") {
      console.error("Restricted page");
      return <Navigate to="/user" />
    }
    return children
  }
  return <Navigate to="/" />;
}
