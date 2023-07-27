import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLastSend } from '../store/EmailVerificationSlice';
import { RootState } from '../store/Store';
import { Button, Container, Typography, Avatar, Box } from '@mui/material';
import { verificationEmail } from '../repo/AuthRepo';
import { useTranslation } from 'react-i18next';
import EmailVerificationHeader from '../componets/EmailVerificationHeader';
import MyBox from '../componets/MyBox';

const EmailVerification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lastSend = useSelector((state: RootState) => state.emailVerification.lastSend);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - (lastSend || 0);
    const shouldDisableButton = timeElapsed < 60000;

    if (shouldDisableButton) {
      setCountdown(Math.floor((60000 - timeElapsed) / 1000));
    } else {
      setCountdown(0);
    }

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown > 0 ? prevCountdown - 1 : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastSend]);

  const resendEmail = async () => {
    verificationEmail();
    dispatch(setLastSend(Date.now()));
    setCountdown(60);
  };

  return (
    <Container
      style={{
        position: 'relative',
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/verification_bg.jpg)`,
        backgroundBlendMode: 'multiply',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <MyBox>
        <EmailVerificationHeader />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Avatar alt='verify email icon' src={`${process.env.PUBLIC_URL}/letter.png`} sx={{ width: 256, height: 256, borderRadius: '50%' }} />
        </Box>
        <Typography variant="h5" gutterBottom>
          {t('bodyVerify1')}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {t('bodyVerify2', { resendBn: t('statusIdleResent') })}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button
            color="inherit" variant="outlined"
            onClick={resendEmail}
            disabled={countdown > 0}
          >
            {countdown > 0 ? t('statusResentWait', { countdown: countdown }) : t('statusIdleResent')}
          </Button></Box>
      </MyBox>

    </Container>
  );
};

export default EmailVerification;
