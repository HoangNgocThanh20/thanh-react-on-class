import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { ProductAddWrapper } from "./styled";

export const ProductAdd = () => {
  const handleAddProduct = () => {};

  return (
    <ProductAddWrapper>
      <Box className="fieldWrapper">
        <Box className="titleField">Name</Box>
        <TextField variant="outlined" fullWidth />
      </Box>

      <Box className="fieldWrapper">
        <Box className="titleField">Image</Box>
        <TextField variant="outlined" fullWidth />
      </Box>

      <Box className="fieldWrapper">
        <Box className="titleField">Description</Box>
        <TextField variant="outlined" fullWidth />
      </Box>

      <Box className="fieldWrapper">
        <Box className="titleField">Price</Box>
        <TextField variant="outlined" fullWidth />
      </Box>

      <Button variant="contained" onClick={handleAddProduct}>
        + Add product
      </Button>
    </ProductAddWrapper>
  );
};
