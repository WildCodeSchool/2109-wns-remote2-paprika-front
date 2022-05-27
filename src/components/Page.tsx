import React from 'react'
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { Box } from '@mui/material';
import AuxProps from '../types/Children';

interface Page {
  children: AuxProps["children"];
  title: String;
  sx: Object;
}

const Page = forwardRef((page: Page, ref) => (
  <Box ref={ref} sx={page.sx}>
    <Helmet>
      <title>{page.title} | Paprika</title>
    </Helmet>
    {page.children}
  </Box>
));

export default Page;
