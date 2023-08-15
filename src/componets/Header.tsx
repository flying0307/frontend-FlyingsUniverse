import React, { useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Toolbar, Typography, IconButton, Link as MuiLink, Box, Avatar, InputAdornment, TextField, Button } from '@mui/material';
import { AuthStatus } from '../store/AuthSlice';
import UtAuth from '../utils/UtAuth';
import { useTranslation } from 'react-i18next';
import { IoLanguageSharp } from 'react-icons/io5';


const Header = () => {
  const loggedInStates = [AuthStatus.NotLoggedIn, AuthStatus.Init];
  const { t, i18n } = useTranslation();
  const [backgroundPosition] = useState(() => {
    const date = new Date();
    const rand = date.getMinutes() / (60 / 6);

    if (rand < 1) {
      return 'top left';
    } else if (rand < 2) {
      return 'top center';
    } else if (rand < 3) {
      return 'top right';
    } else if (rand < 4) {
      return 'bottom left';
    } else if (rand < 5) {
      return 'bottom center';
    } else {
      return 'bottom right';
    }
  });


  const changeLanguage = (event: { target: { value: string; }; }) => {
    i18n.changeLanguageAndSave(event.target.value);
  };
  const isLoggedIn: AuthStatus = useSelector((state: RootState) => state.auth.isLoggedIn);
  const handleLogout = async () => {
    await UtAuth.logout();
  };
  const handleLogin = async () => {
    await UtAuth.login();
  };
  const handleApiDoc = async () => {
    await UtAuth.apiDoc();
  };
  return (
    <AppBar position="static">
      <Toolbar
        style={{
          position: 'relative',
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/header_bg.jpg)`,
          backgroundBlendMode: 'multiply',
          backgroundPosition,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
        }}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
            <Link to="/home">
              <Avatar alt="Flyings' Universe" src={`${process.env.PUBLIC_URL}/logo192.png`} sx={{ width: '50px', height: '50px' }} />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {!loggedInStates.includes(isLoggedIn) ? (
              <>
                {isLoggedIn === AuthStatus.Authenticating ? (
                  <MuiLink component={RouterLink} to="/verification" color="inherit" underline="none" sx={{ mx: 2 }}>
                    {t('linkTextVerification')}
                  </MuiLink>
                ) : (
                  <>
                    <MuiLink component={RouterLink} to="/dashboard" color="inherit" underline="none" sx={{ mx: 2 }}>
                      {t('linkTextDashboard')}
                    </MuiLink>
                    <MuiLink component={RouterLink} to="/profile" color="inherit" underline="none" sx={{ mx: 2 }}>
                      {t('linkTextProfile')}
                    </MuiLink>
                  </>
                )}
              </>
            ) : (<></>)}

            <MuiLink
              component="button"
              onClick={handleApiDoc}
              color="inherit" underline="none" sx={{ mx: 2 }}>
              {t('linkTextApi')}
            </MuiLink>

            {!loggedInStates.includes(isLoggedIn) ? (
              <MuiLink
                component="button"
                onClick={handleLogout}
                color="inherit"
                underline="none"
                sx={{ mx: 2 }}
              >
                {t('linkTextLogout')}
              </MuiLink>
            ) : (
              <MuiLink
                component="button"
                onClick={handleLogin}
                color="inherit"
                underline="none"
                sx={{ mx: 2 }}
              >
                {t('linkTextLogin')}
              </MuiLink>
            )}

            <TextField
              select
              value={i18n.language}
              onChange={changeLanguage}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoLanguageSharp style={{ color: 'white', fill: 'white' }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'zh'}>中文</MenuItem>
            </TextField>
            <IconButton href="https://iamflying.netlify.app/eng.html" target="_blank" rel="noopener noreferrer">
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/flying_eng_universe_qr_code.png`}
                alt="QR code"
                sx={{
                  width: '50px',
                  height: '50px',
                  cursor: 'pointer',
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    transform: 'scale(10) translate(-50%, 50%)',
                    zIndex: 9999,
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
