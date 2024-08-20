import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { Box, Grid, Typography } from "@mui/material";
import useProductServices from "../services/useProductServices";
import { useSelector } from "react-redux";
import PaginationComp from "../components/PaginationComp";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { listProducts } = useProductServices();

  const { products, details, loading } = useSelector((state) => state.product);
  console.log("products homepage", products);

  useEffect(() => {
    listProducts({ page, search: searchQuery });// eslint-disable-next-line 
  }, [page, searchQuery]);

  return (
    <Box maxWidth={1200} mx="auto">
      <Typography
        fontSize={24}
        fontWeight={500}
        align="center"
        my={5}
        color="darkorange"
      >
        Products
      </Typography>
      <PaginationComp page={page} setPage={setPage} details={details} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div>
        <Grid my={5} px={2} container spacing={2} justifyContent={"center"}>
          {loading ? (
            <Spinner />
          ) : (
            products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </Grid>
      </div>
    </Box>
  );
};

export default HomePage;
