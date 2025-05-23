import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import AppContext from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  // For field-specific errors
  const [fieldErrors, setFieldErrors] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user types
    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // Clear general error on any input change
    setError("");
  };

  const validateFields = () => {
    let isValid = true;
    const errors = { userName: "", password: "" };

    if (!formData.userName.trim()) {
      errors.userName = "User Name is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!validateFields()) {
      return; // don't proceed if validation failed
    }

    try {
      setLoading(true);
      const res = await login(formData);

      if (res?.ok) {
        navigate("/");
      } else {
        setError("Invalid login details.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login to Your Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="User Name"
              variant="outlined"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              error={Boolean(fieldErrors.userName)}
              helperText={fieldErrors.userName}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password}
              fullWidth
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
