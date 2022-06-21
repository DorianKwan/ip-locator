import {
  addRoutesToRouter,
  bodyparser,
  HttpMethod,
  Router,
  route,
  SchemaBuilder,
} from '@lcdev/router';
import Geo2LiteService from './service';

export default (geo2LiteService: Geo2LiteService) => {
  const router = new Router();

  router.use(bodyparser());

  return addRoutesToRouter(router, [
    route({
      path: '/address',
      method: HttpMethod.GET,
      querySchema: SchemaBuilder.emptySchema().addString('ip', {
        minLength: 7,
      }),
      async action(ctx, _, { ip }) {
        return geo2LiteService.findAddressByIp(ip);
      },
    }),
  ]);
};
