import {
  addRoutesToRouter,
  bodyparser,
  HttpMethod,
  Router,
  route,
  SchemaBuilder,
} from '@lcdev/router';
import { ipRegex } from '../../utils';

export default (geo2LiteService: Geo2LiteService) => {
  const router = new Router();

  router.use(bodyparser());

  return addRoutesToRouter(router, [
    route({
      path: '/address',
      method: HttpMethod.GET,
      querySchema: SchemaBuilder.emptySchema().addString('ip', {
        minLength: 7,
        pattern: ipRegex.source,
      }),
      async action(ctx, _, { ip }) {
        return geo2LiteService.findAddressByIp(ip);
      },
    }),
  ]);
};
