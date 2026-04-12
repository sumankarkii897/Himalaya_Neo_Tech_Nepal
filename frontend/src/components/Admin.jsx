import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Admin({ children }) {
    const { user } = useContext(AuthContext);
    return user && user.role === "admin" ? children : <Navigate to="/" />;
}