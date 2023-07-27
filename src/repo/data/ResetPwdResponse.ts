import { ResetPwdModel } from '../../model/ResetPwdModel';
//Generate models and serializers from JSON by https://app.quicktype.io/
export interface IResetPwdResponse {
  strong: boolean,
  vaild: boolean,
  changed: boolean,
}

const ResetPwdResponse = {
  toResetPwdModel(reset : IResetPwdResponse) : ResetPwdModel {
    return {
      strong: reset.strong,
      vaild: reset.vaild,
      changed: reset.changed,
    };
  },
};
export default ResetPwdResponse;