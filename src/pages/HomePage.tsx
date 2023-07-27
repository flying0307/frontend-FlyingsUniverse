import React from 'react';
import UtAuth from '../utils/UtAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Loading from '../componets/Loading';
import { AuthStatus } from '../store/AuthSlice';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import MyBox from '../componets/MyBox';

const HomePage = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLogging = useSelector((state: RootState) => state.auth.isLogging);
  const userAuth = useSelector((state: RootState) => state.auth.userAuth);

  if (isLogging) {
    return <Loading />;
  }
  return (
    <Container
      style={{
        position: 'relative',
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/welcome.webp)`,
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
            <Typography variant="h3" gutterBottom>
              {t('greeting', { app: t('appName') })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {isLoggedIn != AuthStatus.NotLoggedIn ? (
              <>
                <Typography variant="h5" align="center" gutterBottom>{t('loggedIn_welcome_desc_1', { name: userAuth ? userAuth.name : '' })}</Typography>
                <Typography variant="h5" align="center" gutterBottom>{t('loggedIn_welcome_desc_2')}</Typography>

                <Box sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Button component={RouterLink} to="/dashboard" color="inherit" variant="outlined" sx={{ mx: 2 }}>
                    {t('linkTextDashboard')}
                  </Button>
                </Box>
                <Typography variant="h5" align="center" gutterBottom>{t('loggedIn_welcome_desc_3')}</Typography>

                <Box sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Button component={RouterLink} to="/profile" color="inherit" variant="outlined" sx={{ mx: 2 }}>
                    {t('linkTextProfile')}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" align="center" gutterBottom>{t('welcome_desc_1', { name: userAuth ? userAuth.name : '' })}</Typography>
                <Typography variant="h5" align="center" gutterBottom>{t('welcome_desc_2')}</Typography>
                <Typography variant="h5" align="center" gutterBottom>{t('welcome_desc_3')}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {isLoggedIn != AuthStatus.NotLoggedIn ? (
              <Box sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button
                  color="inherit" variant="outlined"
                  onClick={() => {
                    UtAuth.logout();
                  }}>
                  {t('linkTextLogout')}
                </Button>
              </Box>
            ) : (

              <Box sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button
                  color="inherit" variant="outlined"
                  onClick={() => {
                    UtAuth.login();
                  }}>
                  {t('linkTextLogin')}
                </Button>
              </Box>
            )
            }
          </Grid>
        </Grid>
      </MyBox>
    </Container>
  );
};

export default HomePage;
