import React from 'react';
import { Box, Button, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import NotFoundPageSvg from '../componets/NotFoundPageSvg';
import MyBox from '../componets/MyBox';

const NotFoundPage = () => {
  const { t } = useTranslation();

  const date = new Date();
  const rand = date.getMinutes() % 2;
  return (
    <Container
      style={{
        position: 'relative',
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/not_found_page_bg.jpg)`,
        backgroundBlendMode: 'multiply',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <MyBox>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            {(rand === 0) ? (
              <img src={`${process.env.PUBLIC_URL}/not_found_page_image.png`} alt="404 Not Found" />
            ) : (
              <NotFoundPageSvg />
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              {t('title404')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {t('text404')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/home" color="inherit" variant="outlined" sx={{ mx: 2 }}>
              {t('back404ToHome')}
            </Button>
          </Grid>
        </Grid>
      </MyBox>
    </Container>
  );
};

export default NotFoundPage;
