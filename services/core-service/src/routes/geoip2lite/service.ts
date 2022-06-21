import { ServiceError } from '../../utils';
import Geo2LiteRepo from './repo';

export default class Geo2LiteService {
  constructor(private readonly geo2LiteRepo: Geo2LiteRepo) {}

  async findAddressByIp(ip: string) {
    const { location, ...addressDetails } =
      await this.geo2LiteRepo.getAddressByIp(ip);
    const { city, country, postal } = addressDetails;

    // we don't care about validating ip address here since it shouldn't make it past our json schema checks

    const errorData = { ip, ...addressDetails, location };

    if (!city) {
      throw new ServiceError({
        type: Geo2LiteServiceError.NoCityFound,
        message: 'No city was found for IP address',
        data: errorData,
      });
    }

    if (!country) {
      throw new ServiceError({
        type: Geo2LiteServiceError.NoCountryFound,
        message: 'No country was found for IP address',
        data: errorData,
      });
    }

    if (!postal) {
      throw new ServiceError({
        type: Geo2LiteServiceError.NoPostalFound,
        message: 'No postal was found for IP address',
        data: errorData,
      });
    }

    if (!location) {
      throw new ServiceError({
        type: Geo2LiteServiceError.NoLocationFound,
        message: 'No location was found for IP address',
        data: errorData,
      });
    }

    const { accuracyRadius, timeZone } = location;

    if (!timeZone) {
      throw new ServiceError({
        type: Geo2LiteServiceError.NoTimeZoneFound,
        message: 'No timeZone was found for IP address',
        data: errorData,
      });
    }

    return { ...addressDetails, accuracyRadius, timeZone };
  }
}

export enum Geo2LiteServiceError {
  NoCityFound = 'geo2lite/no-city-found',
  NoCountryFound = 'geo2lite/no-country-found',
  NoPostalFound = 'geo2lite/no-postal-found',
  NoLocationFound = 'geo2lite/no-location-found',
  NoTimeZoneFound = 'geo2lite/no-timezone-found',
}
