import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import FilterBar from "./filterBar";
import { highlightMatch } from "./utils/highlighMatch";
import EmployeeTable from "./employeeTable";
import PaginationControls from "../Reusable/paginationControls";
import CreateEmployee from "./createEmployee/createEmp";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import DeleteConfirmationDialog from "../Reusable/deleteConfirmationDialogue";
const EmployeeList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { employees, total, fetchEmployees } = useContext(AppContext);

  // State variables
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees({
      search,
      status,
      sortBy,
      sortOrder,
      page,
      limit,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  }, [search, status, sortBy, sortOrder, page, limit, startDate, endDate]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  // Date range change handlers
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setPage(1);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setPage(1);
  };

  // Toggle sorting on column headers
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  // Render sorting icon next to column headers
  const renderSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

  // Handle page change from pagination component
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle rows per page change
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee); // Set employee to edit
  };
  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    console.log("delted");
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/employee/delete/${employeeToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ya jahan se tu token la raha hai
        },
      });
      fetchEmployees();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);

      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        {/* Header and Total Count */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" sx={{ mb: { xs: 1, sm: 0 } }}>
            Employee List
          </Typography>
          <Typography variant="h6">Total: {total}</Typography>
        </Box>

        {/* Filters Section */}
        <FilterBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          statusInput={statusInput}
          setStatusInput={setStatusInput}
          setStatus={setStatus}
          setPage={setPage}
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />

        <EmployeeTable
          employees={employees}
          toggleSort={toggleSort}
          renderSortIcon={renderSortIcon}
          highlightMatch={highlightMatch}
          handleDelete={handleDeleteClick}
          search={search}
          onEdit={handleEdit}
        />

        {/* Pagination and Rows per page */}
        <PaginationControls
          total={total}
          limit={limit}
          page={page}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        />
      </Box>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        loading={loading}
      />
    </>
  );
};

export default EmployeeList;
