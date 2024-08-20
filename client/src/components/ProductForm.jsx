import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";  
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toastWarn } from "../helpers/toastify"; 
import useProductServices from "../services/useProductServices";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ProductForm({ open, setOpen, editItem, setEditItem }) {
  const { createProduct, updateProduct } = useProductServices();
  const { categories } = useSelector((state) => state.category);
  const [inputs, setInputs] = useState({
    categoryId: "",
    title: "",
    description: "",
    price: "",
    brand: "",
    thumbnail: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    images: ["", "", "", "", "", "", "", "", "", ""],
  });

  useEffect(() => {
    if (editItem?.title) {
      setInputs({
        categoryId: editItem?.categoryId?._id || "Select a category",
        title: editItem?.title,
        description: editItem?.description,
        price: editItem?.price,
        brand: editItem?.brand,
        thumbnail: editItem?.thumbnail,
        discountPercentage: editItem?.discountPercentage,
        rating: editItem?.rating,
        stock: editItem?.stock,
        images: editItem?.images,
      });
    } else {
      setInputs({
        categoryId: "",
        title: "",
        description: "",
        price: "",
        brand: "",
        thumbnail: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        images: ["", "", "", "", "", "", "", "", "", ""],
      });
    }
     // eslint-disable-next-line
  }, [open]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.categoryId) {
      toastWarn("categoryId cant be empty!!");
      return;
    } else if (!inputs.title) {
      toastWarn("title cant be empty!!");
      return;
    } else if (!inputs.description) {
      toastWarn("description cant be empty!!");
      return;
    } else if (!inputs.price) {
      toastWarn("price cant be empty!!");
      return;
    } else if (!inputs.brand) {
      toastWarn("brand cant be empty!!");
      return;
    } else if (!inputs.thumbnail) {
      toastWarn("thumbnail cant be empty!!");
      return;
    } else if (
      !(inputs.thumbnail.startsWith("https://") ||
      inputs.thumbnail.startsWith("http://"))
    ) {
      toastWarn("thumbnail should be a valid url!!");
      return;
    } else if ( inputs.images.length > 0 &&
      !inputs.images
        .filter((image) => image)
        .every(
          (item) => item.startsWith("https://") ||  item.startsWith("http://")
        )
    ) {
      toastWarn("images[] should be a valid url !!");
      return;
    }else if (inputs.rating && !(inputs.rating >= 1 && inputs.rating <= 10)) {
        toastWarn("rating should be between 1-10!!");
        return;
      }else if (inputs.discountPercentage && !(inputs.discountPercentage >= 0 && inputs.discountPercentage <= 100)) {
        toastWarn("descount percentage should be between 0-100!!");
        return;
      }

    // setInputs({
    //     ...inputs,
    //     images: [...inputs.images.filter(item=> {
    //         console.log(item);
    //         console.log(Boolean(item));
    //         return Boolean(item)
    //     })]
    // })
    // setInputs({
    //     ...inputs,
    //     images: [...inputs.images.filter(item=> {
    //         console.log(item);
    //         console.log(Boolean(item));
    //         return Boolean(item)
    //     })]
    // })

    // const result = {
    //     ...inputs,
    //     images: [...inputs.images.filter(item=> {

    //         return Boolean(item)
    //     })]
    // }

    console.log(inputs);

    const filteredImages = inputs.images.filter((image) => image); // Bos string elemanlarini filtreler
    if (editItem?.title) {
      updateProduct(editItem?._id, { ...inputs, images: filteredImages });
    } else {
      createProduct({ ...inputs, images: filteredImages });
    }

    // if(editItem?.title){
    //     updateProduct(editItem?._id,inputs)
    // }else{
    //     createProduct(inputs);

    // }
    setInputs({
      categoryId: "",
      title: "",
      description: "",
      price: "",
      brand: "",
      thumbnail: "",
      discountPercentage: "",
      rating: "",
      stock: "",
      images: ["", "", "", "", "", "", "", "", "", ""],
    });
    setEditItem({});
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Inventory2Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Product
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                name="categoryId"
                value={inputs.categoryId}
                onChange={handleChange}
                required
              >
                {categories?.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="categoryId"
              label="Category ID"
              name="categoryId"
              type="text"
              value={inputs.categoryId}
              disabled={true}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Title"
              type="text"
              id="title"
              value={inputs.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              value={inputs.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              value={inputs.price}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="brand"
              label="Brand"
              type="text"
              id="brand"
              value={inputs.brand}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="thumbnail"
              label="Thumbnail"
              type="url"
              id="thumbnail"
              value={inputs.thumbnail}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="discountPercentage"
              label="Discount Percentage"
              type="number"
              id="discountPercentage"
              value={inputs.discountPercentage}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="rating"
              label="Rating"
              type="number"
              id="rating"
              value={inputs.rating}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="stock"
              label="Stock"
              type="number"
              id="stock"
              value={inputs.stock}
              onChange={handleChange}
            />

            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
              <TextField
                margin="normal"
                fullWidth
                name={`images`}
                label={`Image ${i + 1}`}
                type="url"
                id={`images[${i}]`}
                value={inputs.images[i] ? inputs.images[i] : ""}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setInputs({
                    ...inputs,
                    images: [
                      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, j) => {
                        if (j === i) {
                          return e.target.value;
                        }
                        return inputs.images[j];
                      }),
                    ],
                  });
                }}
              />
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
            >
              {editItem?.title ? "Update Product" : "Create Product"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
