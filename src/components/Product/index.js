import * as React from "react";
import { ProductWrapper } from "./styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import getData from "../../api/apiTestData";
import { Box } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import DkAlertComfirm from "../DkAlertComfirm";

export default function Product() {
  const [product, setProduct] = React.useState([]);
  const [deleteStatus, setDeleteStatus] = React.useState({
    status: false,
    id: 0,
  });

  React.useEffect(() => {
    (async function () {
      const product = await getData.getProducts();
      setProduct(product.data);
    })();
  }, []);

  const handleDelete = async (id) => {
    setDeleteStatus({
      status: true,
      id,
    });

    // const deleted = await getData.deleteProduct(id);
    // const product = await getData.getProducts();
    // setProduct(product.data);
  };

  const handleAddProduct = () => {};

  return (
    <ProductWrapper>
      <Box className="titleHeader">Product list</Box>
      <Box className="addBtn">
        <Button variant="contained" onClick={handleAddProduct}>
          + Add product
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={10}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.image}</TableCell>
                <TableCell>{item.price} VND</TableCell>
                <TableCell sx={{ cursor: "pointer" }}>
                  <DeleteForeverIcon
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DkAlertComfirm
        content="Withdrawals and P2P transfer will be disabled for 24 hours after you make this change to protect your account."
        isOpen={deleteStatus.status}
        textNO="CANCEL"
        textYES="CONFIRM"
        onClose={() => {
          setDeleteStatus({
            status: false,
            id: 0,
          });
        }}
        Comfirm={() => {
          console.log(deleteStatus);
        }}
      />
    </ProductWrapper>
  );
}
