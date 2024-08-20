import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom"; 
import useProductServices from "../services/useProductServices";
import Spinner from "../components/Spinner";
 

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProductServices();
  const {oneProduct:product,loading} = useSelector((state) => state.product);

  useEffect(() => {
    getProduct(id);
     // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setImage(product?.thumbnail);
    // eslint-disable-next-line
  }, [product]);

  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(product?.thumbnail);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10) || 0);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    loading ? <Box display='flex' justifyContent={"center"} alignItems={'center'} gap={1} flexDirection={'column'}><Spinner /><Spinner /> <Spinner /></Box> :
    <Card sx={{ maxWidth: 1000, margin: "auto", my: 5, padding: "1rem" }}>
      <Box display={"flex"} flexWrap={"wrap"}>
        <CardMedia
          component="img"
          alt="Sneakers"
          image={image}
          title="Sneakers"
          width={"50%"}
          sx={{ flex: "1", height: "300px", objectFit: "contain" }}
        />

        <CardContent sx={{ flex: "1" }}>
          <Typography gutterBottom variant="h5" component="div">
            {product?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Brand: {product?.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product?.categoryId?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product?.stock}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {product?.rating} / 10
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            
          >
            {product?.description}
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Typography variant="h6">
                $
                {(
                  Number(product?.price) -
                  Number(product?.price) *
                    Number(product?.discountPercentage / 100)
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                label={product?.discountPercentage + "%"}
                color="primary"
                variant="outlined"
                sx={{
                  backgroundColor: "transparent",
                  color: "#FF6E00",
                  border: "1px solid #FF6E00",
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary" mt={1}>
            ${product?.price}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <IconButton aria-label="decrement" onClick={handleDecrement}>
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                inputProps={{ min: 0 }}
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{
                  style: { textAlign: "center" },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <IconButton aria-label="increment" onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={1}
            flexWrap="wrap"
            sx={{ mt: 3 }}
          >
            <Button variant="contained" color="warning" fullWidth>
              Add To Cart
            </Button>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={() => navigate(-1)}
            >
              {" "}
              Go Back
            </Button>
          </Box>
        </CardContent>
      </Box>
      <Box display={"flex"} gap={1} mt={2}>
        <CardMedia
          component="img"
          alt="Sneakers"
          image={product?.thumbnail}
          title="Sneakers"
          sx={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => setImage(product?.thumbnail)}
        />
        {product?.images?.map((item, i) => (
          <CardMedia
            key={i}
            component="img"
            alt="Sneakers"
            image={item}
            title="Sneakers"
            sx={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => setImage(item)}
          />
        ))}
      </Box>
    </Card>
  );
};

export default ProductDetailPage;
