import * as React from 'react';
import Typography from '@mui/material/Typography';
import { DiGoogleAnalytics } from 'react-icons/di';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function DashBoardHeader() {
  const { t } = useTranslation();
  return (
    <Typography variant="h1" gutterBottom>
      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
        <DiGoogleAnalytics style={{ marginRight: '8px' }} />
        {t('subtitleStat')}
      </Box>
    </Typography>
  );
}
