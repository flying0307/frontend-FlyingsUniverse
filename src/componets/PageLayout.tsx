import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../store/Store';
import { useSelector } from 'react-redux';
import { AuthStatus } from '../store/AuthSlice';

interface LayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const notLoginBlackList = ['/dashboard', '/profile', 'verification'];
  const notVerifyBlackList = ['/dashboard', '/profile'];
  const verifiedBlackList = ['/verification'];
  useEffect(() => {
    if (isLoggedIn === AuthStatus.Init) {
      console.log(`${location.pathname} Init`);
    } else if (isLoggedIn === AuthStatus.NotLoggedIn && notLoginBlackList.includes(location.pathname)) {
      console.log(`${location.pathname} Navigate to home`);
      navigate('/home');
    } else if (isLoggedIn === AuthStatus.Authenticating && notVerifyBlackList.includes(location.pathname)) {
      console.log('Navigate to verification');
      navigate('/verification');
    } else if (isLoggedIn === AuthStatus.LoggedIn && verifiedBlackList.includes(location.pathname)) {
      console.log('Login success. Navigate to home');
      navigate('/home');
    }
  }, [isLoggedIn, location]);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default PageLayout;
