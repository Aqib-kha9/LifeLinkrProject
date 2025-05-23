import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const EmployeeTable = ({
  employees = [],
  toggleSort,
  renderSortIcon,
  highlightMatch,
  handleDelete,
  search,
  onEdit,
}) => {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell
              onClick={() => toggleSort("id")}
              sx={{ cursor: "pointer", width: 80 }}
            >
              <Box display="flex" alignItems="center">
                Unique ID {renderSortIcon("id")}
              </Box>
            </TableCell>

            <TableCell>Image</TableCell>

            <TableCell
              onClick={() => toggleSort("name")}
              sx={{ cursor: "pointer" }}
            >
              <Box display="flex" alignItems="center">
                Name {renderSortIcon("name")}
              </Box>
            </TableCell>

            <TableCell
              onClick={() => toggleSort("email")}
              sx={{ cursor: "pointer" }}
            >
              <Box display="flex" alignItems="center">
                Email {renderSortIcon("email")}
              </Box>
            </TableCell>

            <TableCell>Mobile</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Course</TableCell>

            <TableCell
              onClick={() => toggleSort("createdAt")}
              sx={{ cursor: "pointer" }}
            >
              <Box display="flex" alignItems="center">
                Created At {renderSortIcon("createdAt")}
              </Box>
            </TableCell>

            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} align="center">
                No employees found.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell>{highlightMatch(emp.id || "", search)}</TableCell>

                <TableCell>
                  <Avatar
                    src={emp.image || ""}
                    alt={emp.name}
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>

                <TableCell>{highlightMatch(emp.name || "", search)}</TableCell>
                <TableCell>{highlightMatch(emp.email || "", search)}</TableCell>
                <TableCell>{emp.mobile || "-"}</TableCell>
                <TableCell>{emp.designation || "-"}</TableCell>
                <TableCell>{emp.gender || "-"}</TableCell>
                <TableCell>{emp.courses?.join(', ') || "-"}</TableCell>
                <TableCell>
                  {emp.createdAt
                    ? new Date(emp.createdAt).toLocaleDateString()
                    : "-"}
                </TableCell>

                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => {
                        navigate("/create-employee", {
                          state: { employee: emp },
                        });
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(emp._id)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
