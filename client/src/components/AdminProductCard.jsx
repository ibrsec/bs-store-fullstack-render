import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useProductServices from "../services/useProductServices";

// import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';

const AdminProductCard = ({ product, setOpen, setEditItem }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProductServices();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <Box
          onClick={() => navigate("/detail/" + product?._id)}
          sx={{ cursor: "pointer" }}
        >
          <CardMedia
            component="img"
            alt={product?.title}
            height="140"
            image={product?.thumbnail}
            title={product?.title}
            sx={{ objectFit: "contain" }}
          />
          <CardContent sx={{ height: "250px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product?.title}
            </Typography>
            <Typography
              variant="body2"
              lineclamp={2}
              color="textSecondary"
              mb={2}
              component="p"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product?.description}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Price: {product?.price} $
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Discount: {product?.discountPercentage} %
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Rating: {product?.rating} / 10
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Cateogry: {product?.categoryId?.name || "-"}
            </Typography>
          </CardContent>
        </Box>
        <Box display={"flex"} gap={1} justifyContent={"center"} mb={2}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setEditItem(product);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => deleteProduct(product?._id)}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default AdminProductCard;
