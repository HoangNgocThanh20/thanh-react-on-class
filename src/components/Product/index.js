import * as React from "react";
import { ProductWrapper } from "./styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import handleApi from "../../api/apiTestData";
import { Box } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import DkAlertComfirm from "../DkAlertComfirm";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Modal, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

export default function Product() {
  const [product, setProduct] = React.useState([]);
  const [deleteStatus, setDeleteStatus] = React.useState({
    status: false,
    id: 0,
  });

  const [loginStatus, setLoginStatus] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [registerPopup, setRegisterPopup] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [searchValue, setSearchValue] = React.useState({
    search: "",
  });

  const schema = yup.object({
    name: yup.string().required("This field is required "),
    password: yup.string().required("This field is required "),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // get product list

  React.useEffect(() => {
    (async function () {
      const product = await handleApi.getProducts();
      setProduct(product.data);
    })();
  }, []);

  const handleShowPopup = (id) => {
    setDeleteStatus({
      status: true,
      id,
    });
  };

  // handle delete product

  const handleDelete = async () => {
    const deleted = await handleApi.deleteProduct(deleteStatus.id);
    const product = await handleApi.getProducts();
    setProduct(product.data);

    setDeleteStatus({
      status: false,
      id: 0,
    });
  };

  const handleAddProduct = () => {
    navigate("/product/add");
  };

  const handleTextFormat = (text) => {
    return `${text.slice(0, 60)} .....`;
  };

  const handleEditProduct = (id) => {
    navigate(`/product/add?id=${id}`);
  };

  const handleSearch = (e) => {
    setSearchValue({
      ...searchValue,
      [e.target.name]: e.target.value,
    });
  };

  // search api

  React.useEffect(() => {
    let timeout;
    if (searchValue.search.length) {
      timeout = setTimeout(() => {
        (async () => {
          const product = await handleApi.searchProduct(searchValue.search);

          setProduct(product.data);
        })();
      }, 1000);
    } else {
      (async () => {
        const product = await handleApi.getProducts();
        setProduct(product.data);
      })();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue.search]);

  // handle login

  const handleLogin = async () => {
    const product = await handleApi.login();
    const filterLogin = product.data.find(
      (item) =>
        item.email === form.getValues("name") &&
        item.password === form.getValues("password")
    );

    if (filterLogin) {
      setLoginStatus(true);
      setOpen(false);
    } else {
      alert("User account or password incorrect");
      setOpen(false);
    }
  };

  const handleLoginOk = () => {
    setLoginStatus(false);
  };

  // handle register

  const handleOpenRegister = () => {
    setRegisterPopup(true);
  };

  const handleRegister = async () => {
    await handleApi.register({
      email: form.getValues("name"),
      password: form.getValues("password"),
    });

    setRegisterPopup(false);
  };

  return (
    <ProductWrapper>
      <Box className="titleHeader">Product list</Box>

      <Box className="fieldWrapper">
        <Box className="titleField">Search</Box>
        <TextField
          placeholder="search by name"
          name="search"
          value={searchValue.search}
          onChange={handleSearch}
        />
      </Box>

      <Box className="addBtn">
        <Button variant="contained" onClick={handleAddProduct}>
          + Add product
        </Button>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ marginLeft: "20px" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={handleOpenRegister}
          sx={{ marginLeft: "20px" }}
        >
          Register
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
                <TableCell>{handleTextFormat(item.image)}</TableCell>
                <TableCell>{item.price} VND</TableCell>
                <TableCell sx={{ cursor: "pointer" }}>
                  <DeleteForeverIcon
                    onClick={() => {
                      handleShowPopup(item.id);
                    }}
                  />
                  <ModeEditIcon
                    onClick={() => {
                      handleEditProduct(item.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DkAlertComfirm
        content="Are you sure you want to remove this product from the list?"
        isOpen={deleteStatus.status}
        textNO="CANCEL"
        textYES="CONFIRM"
        onClose={() => {
          setDeleteStatus({
            status: false,
            id: 0,
          });
        }}
        Comfirm={handleDelete}
      />

      {/* login popup */}

      <Modal open={open} onClose={handleLogin}>
        <Box sx={{ ...style }}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <Box className="fieldWrapper" sx={{ marginTop: "10px" }}>
              <Box className="titleField" sx={{ margin: "5px 0" }}>
                Name
              </Box>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!form.formState.errors.name}
                    helperText={form.formState.errors.name?.message}
                    fullWidth
                  />
                )}
              />
            </Box>

            <Box className="fieldWrapper" sx={{ marginTop: "10px" }}>
              <Box className="titleField" sx={{ margin: "5px 0" }}>
                Password
              </Box>
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!form.formState.errors.password}
                    helperText={form.formState.errors.password?.message}
                    fullWidth
                  />
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px" }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Modal>

      {/* register popup */}

      <Modal open={registerPopup} onClose={handleRegister}>
        <Box sx={{ ...style }}>
          <form onSubmit={form.handleSubmit(handleOpenRegister)}>
            <Box className="fieldWrapper" sx={{ marginTop: "10px" }}>
              <Box className="titleField" sx={{ margin: "5px 0" }}>
                Name
              </Box>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!form.formState.errors.name}
                    helperText={form.formState.errors.name?.message}
                    fullWidth
                  />
                )}
              />
            </Box>

            <Box className="fieldWrapper" sx={{ marginTop: "10px" }}>
              <Box className="titleField" sx={{ margin: "5px 0" }}>
                Password
              </Box>
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!form.formState.errors.password}
                    helperText={form.formState.errors.password?.message}
                    fullWidth
                  />
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px" }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={loginStatus}
        onClose={() => {
          setRegisterPopup(false);
        }}
      >
        <Box sx={style}>
          <Box sx={{ fontSize: "20px" }}>Login in successfully !!</Box>
          <Button
            variant="contained"
            onClick={handleLoginOk}
            sx={{
              margin: "40px 50% 10px 50% ",
              transform: "translateX(-50%)",
            }}
          >
            ok
          </Button>
        </Box>
      </Modal>
    </ProductWrapper>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  zIndex: 1000,
  padding: "40px 60px",
  borderRadius: "10px",
};
