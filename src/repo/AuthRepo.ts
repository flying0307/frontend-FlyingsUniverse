import AuthResponse from './data/AuthResponse';
import { AuthModel } from '../model/AuthModel';
import AcceptResponse from './data/AcceptResponse';
import { AcceptModel } from '../model/AcceptModel';

export function fetchAuth(): Promise<AuthModel | null> {
  return fetch('/api/auth')
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
  return fetch('/api/auth/verification-email')
    .then((response) => response.json())
    .then((data) => {
      return AcceptResponse.toAcceptModel(data);
    })
    .catch((error: Error) => {
      console.error('Error:', error);
      return null;
    });
}
