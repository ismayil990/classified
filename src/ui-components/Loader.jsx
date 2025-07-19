import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }} className="w-full flex items-center justify-center md:pt-[50px] lg:pt-[50px]">
      <CircularProgress className='text-gray-600' color='black'/>
    </Box>
  );
}