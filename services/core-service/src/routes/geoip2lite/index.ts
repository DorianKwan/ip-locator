import Repo from './repo';
import Service from './service';
import Controller from './controller';

export default () => {
  const repo = new Repo();
  const service = new Service(repo);
  const controller = Controller(service);
  return controller.routes();
};
