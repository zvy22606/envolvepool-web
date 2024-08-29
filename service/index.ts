import UserApi from './webApi/user';
import LaunchPoolApi from './webApi/launchPool';
import WebService from './webService/webService';

class WebApi {
  protected baseURL: string;
  protected service: WebService;
  protected timeout = 10000;

  userApi: UserApi;
  launchPoolApi: LaunchPoolApi;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.service = new WebService({
      baseURL
    });
    this.userApi = new UserApi(this.service);
    this.launchPoolApi = new LaunchPoolApi(this.service);
  }
}

let webApi = null;

if (!webApi) {
  webApi = new WebApi(process.env.BACKEND_BASE_URL || 'https://api.envolvepool.com/v1');
}

export default webApi as WebApi;
