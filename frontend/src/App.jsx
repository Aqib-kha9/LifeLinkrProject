import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/nav";
import Login from "./components/pages/login";
import Dashboard from "./components/pages/dashboard";
import EmployeeList from "./components/employee/employeList";
import CreateEmployee from "./components/employee/createEmployee/createEmp";
import Footer from "./components/footer/footer";
import { Box } from "@mui/material";
import PrivateRoute from "../src/components/utils/privateRoute";

const App = () => {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          mt:8
        }}
      >
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employeeList"
              element={
                <PrivateRoute>
                  <EmployeeList />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-employee"
              element={
                <PrivateRoute>
                  <CreateEmployee />
                </PrivateRoute>
              }
            />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
