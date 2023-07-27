import { SnackbarContext } from './componets/SnackbarContext';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import DashBoard from './pages/DashBoard';
import PageLayout from './componets/PageLayout';
import EmailVerification from './pages/EmailVerification';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/Store';
import { loginStart, loginSuccess, loginFailure, authenticating } from './store/AuthSlice';
import { fetchAuth } from './repo/AuthRepo';
import { Snackbar, AlertColor, Box } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import MyAlert from './componets/MyAlert';
import NotFoundPage from './pages/NotFoundPage';

function TransitionDown(props: React.JSX.IntrinsicAttributes & SlideProps) {
  return <Slide {...props} direction="down" />;
}

function App() {
  console.log(process.env.REACT_APP_ENV);
  if (process.env.REACT_APP_ENV === 'dev') {
    require('./mock/MockService');
  }
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loginStart(null));
    fetchAuth()
      .then((data) => {
        if (data == null || data.id == null) {
          dispatch(loginFailure(null));
        } else if (data.id != null && data.verified) {
          dispatch(loginSuccess(data));
        } else {
          dispatch(authenticating(data));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(null));

      });
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('info');

  const openSnackbar = (message: string, type = 'info') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (

    <SnackbarContext.Provider value={{ openSnackbar, snackbarType }}>
      {
        <Router>
          <Routes>

            <Route path="/verification" element={<PageLayout><EmailVerification /></PageLayout>} />
            <Route path="/profile" element={<PageLayout><UserProfile /></PageLayout>} />
            <Route path="/dashboard" element={<PageLayout><DashBoard /></PageLayout>} />
            <Route path="/home" element={<PageLayout><HomePage /></PageLayout>} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />
          </Routes>
        </Router>}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        TransitionComponent={TransitionDown}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MyAlert
          severity={['error', 'info', 'success', 'warning'].includes(snackbarType) ? snackbarType as AlertColor : 'info'}
        >
          {snackbarMessage}
        </MyAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
export default App;

