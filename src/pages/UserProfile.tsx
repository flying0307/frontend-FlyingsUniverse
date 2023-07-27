import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Avatar } from '@mui/material';
import { fetchUser, updateInfo } from '../repo/UserRepo';
import { UserModel } from '../model/UserModel';
import ProfileHeader from '../componets/ProfileHeader';
import Loading from '../componets/Loading';
import ChangePassword from '../componets/ChangePassword';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/Store';
import { updateAuthUser } from '../store/AuthSlice';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { SnackbarContext } from '../componets/SnackbarContext';
import { useTranslation } from 'react-i18next';
import MyBox from '../componets/MyBox';

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [user, setUser] = useState<UserModel | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [updating, setUpdating] = useState<boolean>(false);
  const [infoNotChange, setInfoNotChange] = useState<boolean>(true);
  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    fetchUser()
      .then((userData) => {
        setUser(userData);
        dispatch(updateAuthUser(userData));
      },
      );

  }, []);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    if (event.target.value === user.name) {
      setInfoNotChange(true);
    } else {
      setInfoNotChange(false);
    }
  };

  const handleUpdateInfo = async () => {
    setUpdating(true);
    const updateUser = await updateInfo(user.email, nickname).then((data) => {
      dispatch(updateAuthUser(data));
      return data;
    });
    if (updateUser != null) {
      setUser(updateUser);
      setInfoNotChange(true);
      openSnackbar(t('msgSuccess'), 'success');
    } else {
      openSnackbar(t('errGeneral'), 'error');
    }
    setUpdating(false);
  };

  if (user === null) {
    return <Loading />;
  }

  return (
    <Container
      style={{
        position: 'relative',
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/profile_bg.jpg)`,
        backgroundBlendMode: 'multiply',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <MyBox>
        <ProfileHeader />

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: 120, height: 120 }}>
            <Avatar alt={user.name} src={user.picture} sx={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            {(user.type.includes('google') || user.type.includes('facebook')) &&
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '40px',
                  height: '40px',
                }}
              >
                {user.type.includes('google') &&
                  <FcGoogle style={{ width: '100%', height: 'auto' }} />
                }
                {user.type.includes('facebook') &&
                  <FaFacebook style={{ width: '100%', height: 'auto' }} />
                }
              </Box>
            }
          </Box>
        </Box>

        <Typography variant="subtitle1">{t('subtitleBasicInfo')}</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>

          <TextField
            label={t('labelEmail')}
            defaultValue={user.email}
            disabled
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label={t('labelUserName')}
            defaultValue={user.nickname}
            onChange={handleNicknameChange}
            fullWidth
            sx={{ mt: 2 }}
          />
        </Box>
        <Box sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button
            color="inherit" variant="outlined"
            onClick={handleUpdateInfo}
            fullWidth
            disabled={updating || infoNotChange}
          >
            {updating ? t('statusUpdatingInfo') : t('statusIdleInfo')}
          </Button>
        </Box>
        {user.type === 'auth0' &&
          <ChangePassword email={user.email} />
        }
      </MyBox>
    </Container>
  );
};

export default UserProfile;
