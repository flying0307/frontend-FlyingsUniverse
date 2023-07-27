import { ResetPwdModel } from '../model/ResetPwdModel';
import { UserModel } from '../model/UserModel';
import { UserStatModel } from '../model/UserStatModel';
import ResetPwdResponse from './data/ResetPwdResponse';
import UserResponse from './data/UserResponse';
import UserStatResponse from './data/UserStatResponse';

export function fetchUser(): Promise<UserModel | null> {
  return fetch('/api/user/me')
    .then((response) => response.json())
    .then((data) =>{
      return UserResponse.toUserModel(data);
    } )
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
}

export function fetchUserList(): Promise<UserModel[] | null> {
  return fetch('/api/user/list')
    .then((response) => response.json())
    .then((data) => {
      return data.map(UserResponse.toUserModel);
    })
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
}

export function fetchUserState(): Promise<UserStatModel | null> {
  return fetch('/api/user/stat')
    .then((response) => response.json())
    .then((data) => {
      return UserStatResponse.toUserStatModel(data);
    })
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
}


export function updateInfo(email: string, name: string): Promise<UserModel | null> {
  return fetch('/api/user/info', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name : name }), 
  })
    .then((response) => response.json())
    .then((data) => {
      return UserResponse.toUserModel(data);
    })
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
  
}

export function resetPassword(email: string, oldPassword: string, newPassword: string): Promise<ResetPwdModel | null> {
  return fetch('/api/user/password', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, old : oldPassword, new : newPassword }), 
  })
    .then((response) => response.json())
    .then((data) => {
      return ResetPwdResponse.toResetPwdModel(data);
    })
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
}
