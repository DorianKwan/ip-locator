import Repo from './repo';
import Service from './service';
import Controller from './controller';

export default (geoIp2LiteApiKey: string, geoIp2LiteApiAccountId: string) => {
  const repo = new Repo(geoIp2LiteApiKey, geoIp2LiteApiAccountId);
  const service = new Service(repo);
  const controller = Controller(service);
  return controller.routes();
};
