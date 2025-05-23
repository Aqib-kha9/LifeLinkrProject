import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  IconButton,
  Collapse,
  useMediaQuery,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const FilterBar = ({
  searchInput,
  setSearchInput,
  statusInput,
  setStatusInput,
  setStatus,
  setPage,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // detects phone
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 2 }}>
      {/* Top Filters Row */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Search by name, email, id"
          value={searchInput}
          size="small"
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, minWidth: "220px" }}
        />

        {isMobile ? (
          <>
            <IconButton
              onClick={() => setShowFilters((prev) => !prev)}
              color="primary"
              sx={{
                minWidth: "40px",
                border: "1px solid rgba(0, 0, 0, 0.23)", 
                borderRadius: "4px", 
                padding: "7px", 
                height: "40px",
              }}
            >
              {showFilters ? <CloseIcon /> : <TuneIcon />}
            </IconButton>
          </>
        ) : (
          <>
            {/* Desktop Full Filters */}
            <Select
              value={statusInput}
              onChange={(e) => {
                setStatusInput(e.target.value);
                setStatus(e.target.value);
                setPage(1);
              }}
              size="small"
              displayEmpty
              sx={{ minWidth: "150px" }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>

            <TextField
              label="Start Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={handleStartDateChange}
              sx={{ minWidth: "140px" }}
            />
            <TextField
              label="End Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={handleEndDateChange}
              sx={{ minWidth: "140px" }}
            />
          </>
        )}

        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: "auto", minWidth: isMobile ? "100%" : "auto" }}
          onClick={() => navigate("/create-employee")} 

        >
          Create Employee
        </Button>
      </Box>

      {/* Mobile Hidden Filters */}
      {isMobile && (
        <Collapse in={showFilters}>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Select
              value={statusInput}
              onChange={(e) => {
                setStatusInput(e.target.value);
                setStatus(e.target.value);
                setPage(1);
              }}
              size="small"
              displayEmpty
              sx={{ minWidth: "100%" }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>

            <TextField
              label="Start Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={handleStartDateChange}
              sx={{ minWidth: "100%" }}
            />
            <TextField
              label="End Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={handleEndDateChange}
              sx={{ minWidth: "100%" }}
            />
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default FilterBar;
