import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
 
  const fetchEmployees = async (params = {}) => {
    try {
       const token = localStorage.getItem("token");
      const { data } = await axios.get(`${apiUrl}/employee/get`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(data.employees);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        alert(data.message || "Login failed");
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setEmployees([]);
    window.location.href = "/login";
  };

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        user,
        employees,
        total,
        fetchEmployees,
        setEmployees,
        setTotal,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
