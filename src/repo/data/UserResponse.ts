import { UserModel } from '../../model/UserModel';
//Generate models and serializers from JSON by https://app.quicktype.io/
export interface IUserResponse {
  user_id:        string;
  email:          string;
  email_verified: boolean;
  username:       string;
  phone_number:   string;
  phone_verified: boolean;
  created_at:     string;
  updated_at:     string;
  picture:        string;
  name:           string;
  nickname:       string;
  last_login:     string;
  logins_count:   number;
  type:           string;
  last_session:    string;
}

const UserResponse = {
  toUserModel(user : IUserResponse) : UserModel {
    return {
      id: user.user_id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
      picture: user.picture,
      created: user.created_at,
      updated: user.updated_at,
      login: user.last_login,
      count: user.logins_count,
      type: user.type,
      last_active : user.last_session,
    };
  },
};
export default UserResponse;