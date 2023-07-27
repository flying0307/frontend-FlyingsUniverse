import * as React from 'react';
import { Container, CircularProgress } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Container maxWidth="md">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="inherit" />
      </div>
    </Container>
  );
};

export default Loading;
