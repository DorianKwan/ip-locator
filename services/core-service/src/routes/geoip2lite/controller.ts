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
import GeoIp2LiteService, { GeoIp2LiteServiceError } from './service';

export default (geoIp2LiteService: GeoIp2LiteService) => {
  const router = new Router();

  router.use(bodyparser());

  return addRoutesToRouter(router, [
    route({
      path: '/find-address',
      method: HttpMethod.GET,
      querySchema: SchemaBuilder.emptySchema().addString('ip', {
        minLength: 7,
        pattern: ipRegex.source,
      }),
      async action(ctx, _, { ip }) {
        try {
          const addressDetails = await geoIp2LiteService.findAddressByIp(ip);
          return addressDetails;
        } catch (error: any) {
          switch (error.type) {
            case GeoIp2LiteServiceError.NoCityFound:
            case GeoIp2LiteServiceError.NoCountryFound:
            case GeoIp2LiteServiceError.NoLocationFound:
            case GeoIp2LiteServiceError.NoPostalFound:
            case GeoIp2LiteServiceError.NoTimeZoneFound:
              throw err(404, error.message).withData(error.data);
            default:
              throw error;
          }
        }
      },
    }),
  ]);
};
