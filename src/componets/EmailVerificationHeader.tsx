import * as React from 'react';
import Typography from '@mui/material/Typography';
import { MdEmail } from 'react-icons/md';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function EmailVerificationHeader() {
  const { t } = useTranslation();
  return (
    <Typography variant="h1" gutterBottom>
      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
        <MdEmail style={{ marginRight: '8px' }} />
        {t('subtitleVerify')}
      </Box>
    </Typography>
  );

}
