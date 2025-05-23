import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Navigate, redirect, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const CreateEmployee = ({ onSuccess }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const existingEmployee = location.state?.employee;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Load existing employee data when component mounts or existingEmployee changes
  useEffect(() => {
    if (existingEmployee) {
      setFormData({
        name: existingEmployee.name || "",
        email: existingEmployee.email || "",
        mobile: existingEmployee.mobile?.toString() || "",
        designation: existingEmployee.designation || "",
        gender: existingEmployee.gender || "",
        courses: existingEmployee.courses || [],
        image: null,
        imageUrl: existingEmployee.image || "",
      });
      setErrors({});
    }
  }, [existingEmployee]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter 10 digit number";
    }

    if (!formData.designation)
      newErrors.designation = "Designation is required";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (formData.courses.length === 0)
      newErrors.courses = "Select at least one course";

    //Image validation only if not editing
    const isEditMode = !!formData._id || !!existingEmployee; // Adjust according to your state

    if (!isEditMode) {
      if (!formData.image) {
        newErrors.image = "Image is required";
      } else {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(formData.image.type)) {
          newErrors.image = "Only JPG or PNG images are allowed";
        }
      }
    } else {
      // If image is uploaded in edit, validate its type
      if (formData.image) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(formData.image.type)) {
          newErrors.image = "Only JPG or PNG images are allowed";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files && files[0]) {
        const file = files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
          setErrors((prev) => ({
            ...prev,
            image: "Only JPG or PNG images are allowed",
          }));
          setFormData((prev) => ({ ...prev, image: null }));
          return;
        } else {
          setErrors((prev) => ({ ...prev, image: "" }));
          setFormData((prev) => ({ ...prev, image: file }));
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    let updatedCourses = [...formData.courses];
    if (checked) {
      updatedCourses.push(value);
    } else {
      updatedCourses = updatedCourses.filter((c) => c !== value);
    }
    setFormData({ ...formData, courses: updatedCourses });
    if (errors.courses && updatedCourses.length > 0) {
      setErrors({ ...errors, courses: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("designation", formData.designation);
    data.append("gender", formData.gender);
    formData.courses.forEach((course) => data.append("courses", course));
    if (formData.image) data.append("image", formData.image);
    const token = localStorage.getItem("token");
    try {
      let res;
      if (existingEmployee && existingEmployee._id) {
        // Update existing employee (PUT or PATCH)

        res = await axios.put(
          `${apiUrl}/employee/${existingEmployee._id}/update`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Employee updated successfully!");
        navigate("/");
      } else {
        // Create new employee
        res = await axios.post(`${apiUrl}/employee/create`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Employee created successfully!");
        navigate("/");
      }
      console.log("Response:", res.data);
      if (onSuccess) onSuccess(res.data); // callback if needed

      // Optionally reset form only after creation (not update)
      if (!existingEmployee) {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          courses: [],
          image: null,
        });
      }
    } catch (error) {
      if (
        error.response.data.message &&
        error.response.data &&
        error.response.data.message === "Email already exists"
      ) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      } else {
        alert(error.response.data.message);
      }
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {existingEmployee ? "Update Employee" : "Create Employee"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ gap: 2 }}>
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              name="mobile"
              label="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
            <FormControl fullWidth error={!!errors.designation}>
              <InputLabel>Designation</InputLabel>
              <Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                label="Designation"
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
              <Typography color="error" variant="caption">
                {errors.designation}
              </Typography>
            </FormControl>

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              <Typography color="error" variant="caption">
                {errors.gender}
              </Typography>
            </FormControl>

            <FormControl>
              <FormLabel>Courses</FormLabel>
              <FormGroup row>
                {["MCA", "BCA", "BSC"].map((course) => (
                  <FormControlLabel
                    key={course}
                    control={
                      <Checkbox
                        value={course}
                        checked={formData.courses.includes(course)}
                        onChange={handleCourseChange}
                      />
                    }
                    label={course}
                  />
                ))}
              </FormGroup>
              <Typography color="error" variant="caption">
                {errors.courses}
              </Typography>
            </FormControl>

            <div>
              <FormLabel>Upload Image</FormLabel>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                style={{ marginTop: "8px" }}
              />

              {/* Always show error if any */}
              {errors.image && (
                <Typography color="error" variant="caption">
                  {errors.image}
                </Typography>
              )}

              {/* Show image preview only if image or imageUrl exists */}
              {(formData.image || formData.imageUrl) && (
                <Grid container alignItems="center" spacing={2} mt={1}>
                  <Grid item>
                    <Avatar
                      src={
                        formData.image
                          ? URL.createObjectURL(formData.image)
                          : formData.imageUrl
                      }
                      alt="Preview"
                      sx={{ width: 60, height: 60 }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="error"
                      onClick={() =>
                        setFormData({ ...formData, image: null, imageUrl: "" })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </div>

            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
              disabled={loading}
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
            >
              {loading
                ? existingEmployee
                  ? "Updating..."
                  : "Submitting..."
                : existingEmployee
                ? "Update"
                : "Submit"}
            </Button>
          </FormGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEmployee;
