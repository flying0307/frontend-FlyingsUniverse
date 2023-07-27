import React, { useEffect, useState } from 'react';
import { CircularProgress, Card, CardContent, Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { fetchUserList, fetchUserState } from '../repo/UserRepo';
import { UserModel } from '../model/UserModel';
import { UserStatModel } from '../model/UserStatModel';
import Loading from '../componets/Loading';
import DashBoardHeader from '../componets/DashBoardHeader';
import { FaThList } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import UtTime from '../utils/UtTime';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { BsFillFilePersonFill } from 'react-icons/bs';
import MyBox from '../componets/MyBox';

const DashBoard = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const [statistics, setStatistics] = useState<UserStatModel>({
    total: 0,
    today: 0,
    last7: 0,
  });

  useEffect(() => {
    fetchUserList()
      .then((data) => setUsers(data));

    fetchUserState()
      .then((data) => setStatistics(data));
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: t('statUserType'),
      width: 30,
      renderCell: (params: GridCellParams) => {
        const user = params.row as UserModel;
        if (user.type) {

          if (user.type.includes('google')) {
            return <FcGoogle style={{ width: '28px', height: '28px' }} />;
          } else if (user.type.includes('facebook')) {
            return <FaFacebook style={{ width: '28px', height: '28px' }} />;
          } else {
            return <BsFillFilePersonFill style={{ width: '28px', height: '28px' }} />;
          }
        }
      },
    },
    { field: 'name', headerName: t('statUserName'), flex: 1 },
    { field: 'created', headerName: t('statUserSignUpTime'), flex: 1 },
    { field: 'count', headerName: t('statUserNoLogins'), flex: 1 },
    {
      field: 'login', headerName: t('statUserLastSessionTime'), flex: 1,
    },
  ];
  if (users == null) {
    return <Loading />;
  }

  return (
    <Container
      style={{
        position: 'relative',
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/dashboard_bg.jpg)`,
        backgroundBlendMode: 'multiply',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <MyBox>
        <DashBoardHeader />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Card style={{ backgroundColor: '#647C90', margin: '10px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('statNoUsers')}
              </Typography>
              <Typography variant="h5" component="div">
                {statistics.total}
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ flex: 2, backgroundColor: '#3B5168', margin: '10px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('statNoTodayActive')}
              </Typography>
              <Typography variant="h5" component="div">
                {statistics.today}
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ flex: 3, backgroundColor: '#2A3542 ', margin: '10px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('statAvgLast7')}
              </Typography>
              <Typography variant="h5" component="div">
                {statistics.last7}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>

          <Typography variant="subtitle1" gutterBottom>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <FaThList style={{ marginRight: '8px' }} />
              {t('statUserDatabase')}
            </Box>
          </Typography>
          <DataGrid
            rows={users.map((user: UserModel, index) => ({
              id: index,
              name: user.name,
              created: UtTime.convertUTCToLocal(user.created),
              count: user.count,
              login: UtTime.convertUTCToLocal(user.last_active),
              type: user.type,
            }))}
            columns={columns}
            pageSizeOptions={[5, 10]}
            pagination
          />
        </div>

      </MyBox>
    </Container>
  );
};

export default DashBoard;
