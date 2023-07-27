import * as React from 'react';
import Typography from '@mui/material/Typography';
import { BsPersonFill } from 'react-icons/bs';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ProfileHeader() {
  const { t } = useTranslation();
  return (
    <Typography variant="h1" gutterBottom>
      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
        <BsPersonFill style={{ marginRight: '8px' }} />
        {t('subtitleMyProfile')}
      </Box>
    </Typography>
  );

}
