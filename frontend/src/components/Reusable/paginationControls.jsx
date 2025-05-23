import React from "react";
import { Box, Pagination, Select, MenuItem } from "@mui/material";

const PaginationControls = ({ total, limit, page, handlePageChange, handleLimitChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />

      <Select value={limit} onChange={handleLimitChange} size="small">
        {[5, 10, 20, 50].map((size) => (
          <MenuItem key={size} value={size}>
            Show {size}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default PaginationControls;
