import React, { useEffect, useContext } from "react";
import { Box, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AppContext from "../../context/AppContext";

const EmployeeDashboard = () => {
  const { employees, total, fetchEmployees } = useContext(AppContext);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const designationCount = employees?.reduce((acc, emp) => {
    acc[emp.designation] = (acc[emp.designation] || 0) + 1;
    return acc;
  }, {});

  const genderCount = employees?.reduce((acc, emp) => {
    const gender = emp.gender.toLowerCase();
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const courseCount = employees?.reduce((acc, emp) => {
    if (emp.courses && emp.courses.length > 0) {
      emp.courses.forEach((course) => {
        acc[course] = (acc[course] || 0) + 1;
      });
    } else {
      acc["None"] = (acc["None"] || 0) + 1;
    }
    return acc;
  }, {});

  const designationData = Object.keys(designationCount).map((key) => ({
    name: key,
    count: designationCount[key],
  }));

  const courseData = Object.keys(courseCount).map((key) => ({
    name: key,
    value: courseCount[key],
  }));

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: "Total Employees", value: total },
          {
            label: "Designations",
            value: Object.keys(designationCount).length,
          },
          { label: "Male Employees", value: genderCount["male"] || 0 },
          { label: "Female Employees", value: genderCount["female"] || 0 },
        ].map((item, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={3}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <Card
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                },
                maxWidth: {
                  xs: "180px",
                  sm: "100%",
                },
              }}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 2,
              width: {
                xs: "91%", // 91% width on extra small screens
                md: "365px", // 100% width on medium and larger screens (optional)
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Employees by Designation
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={designationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Employees" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 2,
              width: {
                xs: "91%", // 91% width on extra small screens
                md: "365px", // 100% width on medium and larger screens (optional)
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Course Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {courseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 2,
              maxHeight: 340,
              overflow: "auto",
              width: {
                xs: "91%",
                md: "365px",
              },
              mx: "auto", // Center align the Paper horizontally
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Employees
            </Typography>
            <Box>
              {[...employees]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((emp) => (
                  <Box
                    key={emp._id}
                    mb={2}
                    pb={1}
                    borderBottom="1px solid #eee"
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      {emp.image && (
                        <img
                          src={emp.image}
                          alt={emp.name}
                          style={{ width: 40, height: 40, borderRadius: "50%" }}
                        />
                      )}
                      <Typography variant="subtitle1">{emp.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {emp.designation} • {emp.email}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Joined: {formatDate(emp.createdAt)}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;
