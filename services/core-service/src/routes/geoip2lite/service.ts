import { ServiceError } from '../../utils';
import GeoIp2LiteRepo from './repo';

export default class GeoIp2LiteService {
  constructor(private readonly geoIp2LiteRepo: GeoIp2LiteRepo) {}

  async findAddressByIp(ip: string) {
    const { location, ...addressDetails } =
      await this.geoIp2LiteRepo.getAddressByIp(ip);
    const { city, country, postal } = addressDetails;

    // we don't care about validating ip address here since it shouldn't make it past our json schema checks

    const errorData = { ip, ...addressDetails, location };

    if (!city) {
      throw new ServiceError({
        type: GeoIp2LiteServiceError.NoCityFound,
        message: 'No city was found for IP address',
        data: errorData,
      });
    }

    const cityName = city.names.en;

    if (!country) {
      throw new ServiceError({
        type: GeoIp2LiteServiceError.NoCountryFound,
        message: 'No country was found for IP address',
        data: errorData,
      });
    }

    const countryName = country.names.en;

    if (!postal) {
      throw new ServiceError({
        type: GeoIp2LiteServiceError.NoPostalFound,
        message: 'No postal was found for IP address',
        data: errorData,
      });
    }

    const postalCode = postal.code;

    if (!location) {
      throw new ServiceError({
        type: GeoIp2LiteServiceError.NoLocationFound,
        message: 'No location was found for IP address',
        data: errorData,
      });
    }

    const { accuracyRadius, timeZone } = location;

    if (!timeZone) {
      throw new ServiceError({
        type: GeoIp2LiteServiceError.NoTimeZoneFound,
        message: 'No timeZone was found for IP address',
        data: errorData,
      });
    }

    return {
      city: cityName,
      country: countryName,
      postal: postalCode,
      accuracyRadius,
      timeZone,
    };
  }
}

export enum GeoIp2LiteServiceError {
  NoCityFound = 'geoIp2lite/no-city-found',
  NoCountryFound = 'geoIp2lite/no-country-found',
  NoPostalFound = 'geoIp2lite/no-postal-found',
  NoLocationFound = 'geoIp2lite/no-location-found',
  NoTimeZoneFound = 'geoIp2lite/no-timezone-found',
}
