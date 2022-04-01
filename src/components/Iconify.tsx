import React from 'react'
import { Icon, IconifyIcon } from '@iconify/react';
import { Box } from '@mui/material';

interface Icon {
  type: any;
}

export default function Iconify(icon: Icon) {
  return <Box component={Icon} icon={icon.type} />;
}
