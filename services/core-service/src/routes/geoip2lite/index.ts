import Repo from './repo';
import Service from './service';
import Controller from './controller';

export default (geo2LiteApiKey: string, geo2LiteApiAccountId: string) => {
  const repo = new Repo(geo2LiteApiKey, geo2LiteApiAccountId);
  const service = new Service(repo);
  const controller = Controller(service);
  return controller.routes();
};
