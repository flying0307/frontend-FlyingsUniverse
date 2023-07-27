import { IAuthResponse } from '../repo/data/AuthResponse';
import { IAcceptResponse } from '../repo/data/AcceptResponse';
import { IUserResponse } from '../repo/data/UserResponse';
import { IUserStatResponse } from '../repo/data/UserStatResponse';
import { IResetPwdResponse } from '../repo/data/ResetPwdResponse';

const MockData = {
  testId : 'google-oauth2|3345678',
  testName : 'Flying',
  testEmail : 'Flying@aha.com',
  testOldPassword : '3345678',
  authLoginData: null as IAuthResponse | null,
  authAuthingData: null as IAuthResponse | null,
  googleData: null as IAuthResponse | null,
  facebookData: null as IAuthResponse | null,
  testUser: null as IAuthResponse | null,
  emailData: null as IAcceptResponse | null,
  meData: null as IUserResponse | null,
  userListData: null as IUserResponse[] | null,
  statData: null as IUserStatResponse | null,
  changePwdData: null as IResetPwdResponse | null,
};

MockData.authLoginData = {
  user_id: MockData.testId,
  name: MockData.testName,
  email: MockData.testEmail,
  type: 'auth0',
  email_verified: true,
} as IAuthResponse;

MockData.authAuthingData = {
  user_id: MockData.testId,
  name: MockData.testName,
  email: MockData.testEmail,
  type: 'auth0',
  email_verified: false,
} as IAuthResponse;

MockData.googleData = {
  user_id: `google-auth2|${MockData.testId}`,
  name: MockData.testName,
  email: MockData.testEmail,
  type: 'google-auth2',
  email_verified: true,
} as IAuthResponse;

MockData.facebookData = {
  user_id: `facebook|${MockData.testId}`,
  name: MockData.testName,
  email: MockData.testEmail,
  type: 'facebook',
  email_verified: true,
} as IAuthResponse;

MockData.testUser = MockData.authLoginData;

MockData.emailData = {
  accept: true,
} as IAcceptResponse;

MockData.meData = {
  user_id: MockData.testId,
  name: MockData.testName,
  email: MockData.testEmail,
  nickname: MockData.testName,
  email_verified: false,
  created_at: '2023-07-14T06:20:52.442Z',
  updated_at: '2023-07-14T06:20:52.442Z',
  picture: 'http://',
  last_login: '2023-07-14T06:20:52.442Z',
  logins_count: 10,
  last_session: '2023-07-25T06:20:52.442Z',
  type: MockData.testUser?.type,
} as IUserResponse;

MockData.userListData = [{
  user_id: 'hK3345678',
  email: '345@678.com',
  email_verified: false,
  created_at: '2023-07-14T06:20:52.442Z',
  updated_at: '2023-07-14T06:20:52.442Z',
  picture: 'http://',
  name: 'Star',
  nickname: 'Star',
  last_login: '2023-07-14T06:20:52.442Z',
  logins_count: 10,
  last_session: '2023-07-24T06:20:52.442Z',
  type: 'auth0',
}, {
  user_id: 'tw123ewsd',
  email: '111@2222.com',
  email_verified: false,
  created_at: '2023-07-14T06:20:52.442Z',
  updated_at: '2023-07-14T06:20:52.442Z',
  picture: 'http://',
  name: 'Victor',
  nickname: 'VictorN',
  last_login: '2023-07-14T06:20:52.442Z',
  logins_count: 20,
  last_session: '2023-07-19T11:20:52.442Z',
  type: 'google-oauth2',
}, {
  user_id: 'fv123',
  email: '34@uuu.com',
  email_verified: false,
  created_at: '2023-07-14T06:20:52.442Z',
  updated_at: '2023-07-14T06:20:52.442Z',
  picture: 'http://',
  name: 'VCBB20',
  nickname: 'VictorN',
  last_login: '2023-07-14T06:20:52.442Z',
  logins_count: 10,
  last_session: '2023-07-23T11:20:52.442Z',
  type: 'facebook',
}] as IUserResponse[];

MockData.statData  = {
  total_user:             123,
  today_active_user:      11,
  avg_last_7_active_user: 28,
} as IUserStatResponse;

MockData.changePwdData = {
  vaild: true,
  changed: true,
} as IResetPwdResponse;

export default MockData;
