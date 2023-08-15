import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Box, InputAdornment, IconButton, Avatar, Autocomplete } from '@mui/material';
import { Check, Close, Visibility, VisibilityOff } from '@mui/icons-material';

import UtPassword from '../utils/UtPassword';
import { resetPassword } from '../repo/UserRepo';
import { SnackbarContext } from './SnackbarContext';
import { useTranslation } from 'react-i18next';

interface ChangePasswordProps {
  email: string;
}
const ChangePassword: React.FC<ChangePasswordProps> = (para) => {

  const { t } = useTranslation();
  const { openSnackbar } = useContext(SnackbarContext);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [reseting, setReseting] = useState<boolean>(false);

  const handlePasswordReset = async () => {
    if (oldPassword == '') {
      openSnackbar(t('errOldPwdEmpty'), 'error');
      return;
    }
    if (oldPassword != '' && newPassword == '') {
      openSnackbar(t('errNewPwdEmpty'), 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      openSnackbar(t('errNewPwdNotMatch'), 'error');
      return;
    }
    if (!UtPassword.validatePassword(newPassword)) {
      openSnackbar(t('errNewPwdInvalid'), 'error');
      return;
    }


    setReseting(true);
    try {
      const result = await resetPassword(para.email, oldPassword, newPassword);
      if (!result.strong) {
        openSnackbar(t('errWeakPassword'), 'error');
      } else if (!result.vaild) {
        openSnackbar(t('errOldPwdNotMatch'), 'error');
      } else if (!result.changed) {
        openSnackbar(t('errGeneral'), 'error');
      } else {
        openSnackbar(t('msgSuccess'), 'success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } finally {
      setReseting(false);
    }

  };


  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const passwordValidationResults = UtPassword.validatePassword(newPassword);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'oldPassword') {
      setOldPassword(event.target.value);
    } else if (event.target.name === 'newPassword') {
      setNewPassword(event.target.value);
    } else if (event.target.name === 'confirmPassword') {
      setConfirmPassword(event.target.value);
    }
  };

  return (
    <div>

      <Typography variant="subtitle1" gutterBottom>
        {t('subtitleResetPwd')}
      </Typography>
      <TextField
        label={t('labelOldPassword')}
        type="password"
        name="oldPassword"
        value={oldPassword}
        onChange={handlePasswordChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label={t('labelNewPassword')}
        type={showPassword ? 'text' : 'password'}
        name="newPassword"
        value={newPassword}
        onChange={handlePasswordChange}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: 64,
        }}
        error={newPassword !== confirmPassword}
      />

      <TextField
        label={t('labelConfirmPassword')}
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={confirmPassword}
        onChange={handlePasswordChange}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: 64,
        }}
        error={newPassword !== confirmPassword}
      />

      <Box sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Button
          color="inherit" variant="outlined"
          onClick={handlePasswordReset}
          fullWidth
          disabled={reseting}  // Disable the button while loading
        >
          {reseting ? t('statusResetingPwd') : t('statusIdleResetPwd')}
        </Button>
      </Box>

      {newPassword.length > 0 && (
        <Box sx={{ backgroundColor: '#eeeeee', mt: 2, p: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                {t('labelPwdStrength')}
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {passwordValidationResults.length ? <Check /> : <Close />}
                  </ListItemIcon>
                  <ListItemText primary={t('labelPwdRule1')} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    {passwordValidationResults.lowerCase ? <Check /> : <Close />}
                  </ListItemIcon>
                  <ListItemText primary={t('labelPwdRule2')} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    {passwordValidationResults.upperCase ? <Check /> : <Close />}
                  </ListItemIcon>
                  <ListItemText primary={t('labelPwdRule3')} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    {passwordValidationResults.digit ? <Check /> : <Close />}
                  </ListItemIcon>
                  <ListItemText primary={t('labelPwdRule4')} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    {passwordValidationResults.specialCharacter ? <Check /> : <Close />}
                  </ListItemIcon>
                  <ListItemText primary={t('labelPwdRule5')} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

      )}

    </div>
  );
};

export default ChangePassword;