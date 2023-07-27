import { AcceptModel } from '../../model/AcceptModel';
//Generate models and serializers from JSON by https://app.quicktype.io/
export interface IAcceptResponse {
  accept: boolean;
}

const AcceptResponse = {
  toAcceptModel(res : IAcceptResponse) : AcceptModel {
    return {
      accept: res.accept,
    };
  },
};
export default AcceptResponse;