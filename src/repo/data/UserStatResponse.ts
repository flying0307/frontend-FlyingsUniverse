import { UserStatModel } from '../../model/UserStatModel';
//Generate models and serializers from JSON by https://app.quicktype.io/
export interface IUserStatResponse {
  total_user:             number;
  today_active_user:      number;
  avg_last_7_active_user: number;
}

const UserStatResponse = {
  toUserStatModel(sa : IUserStatResponse) : UserStatModel {
    return {
      total: sa.total_user,
      today: sa.today_active_user,
      last7: sa.avg_last_7_active_user,
    };
  },
};
export default UserStatResponse;