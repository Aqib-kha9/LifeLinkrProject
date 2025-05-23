import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 2,
        backgroundColor: (theme) => theme.palette.grey[200],
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} LifeLinkr. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Developed by{' '}
        <Link href="https://github.com/Aqib-kha9" target="_blank" rel="noopener" underline="hover">
          Aqib
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
