import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

const MyBox: React.FC<BoxProps> = (props) => {
  return (
    <Box
      {...props}
      sx={{
        m: 0,
        border: '16px solid transparent',
        ...props.sx,
      }}
    />
  );
};

export default MyBox;
