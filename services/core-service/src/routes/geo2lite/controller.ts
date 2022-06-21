import {
  addRoutesToRouter,
  bodyparser,
  HttpMethod,
  Router,
  route,
  SchemaBuilder,
  err,
} from '@lcdev/router';
import { ipRegex } from '../../utils';
import Geo2LiteService, { Geo2LiteServiceError } from './service';

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
        try {
          const addressDetails = await geo2LiteService.findAddressByIp(ip);
          return addressDetails;
        } catch (error: any) {
          switch (error.type) {
            case Geo2LiteServiceError.NoCityFound:
            case Geo2LiteServiceError.NoCountryFound:
            case Geo2LiteServiceError.NoLocationFound:
            case Geo2LiteServiceError.NoPostalFound:
            case Geo2LiteServiceError.NoTimeZoneFound:
              throw err(404, error.message).withData(error.data);
            default:
              throw error;
          }
        }
      },
    }),
  ]);
};
