import { Box, Pagination } from '@mui/material';
import React from 'react';


const PaginationComp = ({page, setPage,details}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box display={"flex"} flexDirection={'column'} alignItems={"center"} gap={3} justifyContent={"center"} my={5}>

    <Pagination
      count={details?.pages ? details?.pages?.totalPage : 1}
      page={page}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      />
      <div>Total Products: {details?.totalrecords} </div>
      </Box>
  );
};

export default PaginationComp;