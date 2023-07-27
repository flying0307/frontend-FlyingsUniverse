// server.js
import fetchMock from 'fetch-mock';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { loginStart, loginSuccess, loginFailure, authenticating } from '../store/AuthSlice';
import MockData from './MockData';

let authData = {};
const dispatch: AppDispatch = useDispatch();

console.log('MockService start...');
fetchMock.get('/login', (url, opts) => {
  console.log('login');

  if (MockData.testUser.email_verified) {
    authData = MockData.testUser;
    dispatch(loginSuccess(authData));
  } else {
    authData = MockData.testUser;
    dispatch(authenticating(authData));
  }
  return {
    status: 302,
    headers: {
      'Location': '/home',
    },
    body: '',
  };
});


fetchMock.get('/logout', (url, opts) => {
  console.log('logout');
  dispatch(loginFailure(null));
  return {
    status: 302,
    headers: {
      'Location': '/home',
    },
    body: '',
  };
});

fetchMock.get('/api/auth', (url, opts) => {
  console.log('/api/auth');
  console.log(authData);
  return {
    status: 200,
    headers: { 'content-type': 'application/json' },
    body: authData };
});

fetchMock.get('/api/auth/verification-email', {
  status: 200,
  headers: { 'content-type': 'application/json' },
  body: MockData.emailData,
});

fetchMock.get('/api/user/me', {
  status: 200,
  headers: { 'content-type': 'application/json' },
  body: MockData.meData,
});

fetchMock.get('/api/user/list', (url, opts) => {
  const newList = [MockData.meData, ...MockData.userListData];
  return { status: 200,
    headers: { 'content-type': 'application/json' },
    body: newList,
  };
});


fetchMock.get('/api/user/stat', {
  status: 200,
  headers: { 'content-type': 'application/json' },
  body: MockData.statData,
});

fetchMock.post('/api/user/info',  (url, opts) => {
  const requestBody = JSON.parse(opts.body as string);
  console.log(requestBody);
  MockData.meData.name = requestBody.name;
  MockData.meData.nickname = requestBody.name;
  console.log(MockData.meData);
  return {
    status: 200,
    headers: { 'content-type': 'application/json' },
    body: MockData.meData,
  };
});

fetchMock.post('/api/user/password', (url, opts) => {
  const requestBody = JSON.parse(opts.body as string);
  console.log(requestBody);
  
  if (requestBody.old != MockData.testOldPassword) {
    MockData.changePwdData.vaild = false;
    MockData.changePwdData.changed = false;
    return {
      status: 200,
      headers: { 'content-type': 'application/json' },
      body: MockData.changePwdData,
    };
  
  } else {
    MockData.changePwdData.vaild = true;
    MockData.changePwdData.changed = true;
    MockData.testOldPassword = requestBody.new;

    return {
      status: 200,
      headers: { 'content-type': 'application/json' },
      body: MockData.changePwdData,
    };
  }
});
