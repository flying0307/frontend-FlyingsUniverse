import { AuthModel } from '../../model/AuthModel';
//Generate models and serializers from JSON by https://app.quicktype.io/
export interface IAuthResponse {
  user_id: string;
  name: string;
  email: string;
  email_verified: boolean;
  type: string;
}

const AuthResponse = {
  toAuthModel(auth : IAuthResponse) : AuthModel {
    return {
      id: auth.user_id,
      name: auth.name,
      email: auth.email,
      verified: auth.email_verified,
      type: auth.type,
    };
  },
};
export default AuthResponse;