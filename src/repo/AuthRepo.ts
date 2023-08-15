import AuthResponse from './data/AuthResponse';
import { AuthModel } from '../model/AuthModel';
import AcceptResponse from './data/AcceptResponse';
import { AcceptModel } from '../model/AcceptModel';
import UtAuth from '../utils/UtAuth';

export function fetchAuth(): Promise<AuthModel | null> {
  return UtAuth.commonFetch('/api/auth')
    .then((response) => response.json())
    .then((data) =>{
      return AuthResponse.toAuthModel(data);
    } )
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
}

export function verificationEmail(): Promise<AcceptModel | null> {
  return UtAuth.commonFetch('/api/auth/verification-email')
    .then((response) => response.json())
    .then((data) => {
      return AcceptResponse.toAcceptModel(data);
    })
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
}
