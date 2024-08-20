import { Box, Skeleton } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
    <Box sx={{ pt: 0.5 }}>

              <Skeleton width="370px" />
              <Skeleton width="370px" />
              <Skeleton width="370px" />
              <Skeleton width="370px" />
              <Skeleton width="370px" />
            </Box>
  )
}

export default Spinner