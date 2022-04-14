import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ProductAddWrapper } from "./styled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import handleApi from "../../api/apiTestData";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

export const ProductAdd = () => {
  const schema = yup.object({
    name: yup.string().required("This field is required "),
    image: yup.string().required("This field is required "),
    description: yup.string(),
    price: yup.string().required("This field is required "),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: "",
    },
    resolver: yupResolver(schema),
  });

  const [product, setProduct] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      if (location.search.length) {
        const product = await handleApi.getProducts();
        setProduct(product.data);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (product.length) {
      const myProduct = product.filter(
        (item) => item.id === Number(queryString.parse(location.search).id)
      );

      form.setValue("name", myProduct[0]?.name);
      form.setValue("image", myProduct[0]?.image);
      form.setValue("description", myProduct[0]?.description);
      form.setValue("price", myProduct[0]?.price);
    }
  }, [product]);

  const handleSubmit = async (data) => {
    if (location.search.length) {
      const updateData = await handleApi.updateProduct(
        queryString.parse(location.search).id,
        data
      );
      navigate("/");
    } else {
      const addData = await handleApi.addProduct(data);
      navigate("/");
    }
  };

  return (
    <ProductAddWrapper onSubmit={form.handleSubmit(handleSubmit)}>
      <Box className="fieldWrapper">
        <Box className="titleField">Name</Box>
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

      <Box className="fieldWrapper">
        <Box className="titleField">Image</Box>
        <Controller
          name="image"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!form.formState.errors.image}
              helperText={form.formState.errors.image?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box className="fieldWrapper">
        <Box className="titleField">Description</Box>
        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!form.formState.errors.description}
              helperText={form.formState.errors.description?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box className="fieldWrapper">
        <Box className="titleField">Price</Box>
        <Controller
          name="price"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!form.formState.errors.price}
              helperText={form.formState.errors.price?.message}
              fullWidth
            />
          )}
        />
      </Box>
      {location.search.length ? (
        <Button variant="contained" type="submit">
          Edit Product
        </Button>
      ) : (
        <Button variant="contained" type="submit">
          + Add product
        </Button>
      )}
    </ProductAddWrapper>
  );
};
