import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={() => navigate("/detail/" + product?._id)}
      sx={{ cursor: "pointer" }}
    >
      <Card >
        <CardMedia
          component="img"
          alt={product?.title}
          height="140"
          image={product?.thumbnail}
          title={product?.title}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{height:"250px"}}>
          <Typography gutterBottom variant="h6" component="h2" 
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
            {product?.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            mb={2}
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
      </Card>
    </Grid>
  );
};

export default ProductCard;
