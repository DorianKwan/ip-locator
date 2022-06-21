import Repo from './repo';
import Service from './service';
import Controller from './controller';

export default (geo2LiteApiKey: string) => {
  const repo = new Repo(geo2LiteApiKey);
  const service = new Service(repo);
  const controller = Controller(service);
  return controller.routes();
};
