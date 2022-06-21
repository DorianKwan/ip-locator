import { Reader } from '@maxmind/geoip2-node';
import path from 'path';

export default class GeoIp2LiteRepo {
  async getAddressByIp(ip: string) {
    const reader = await Reader.open(
      path.join(__dirname, '../../assets', 'GeoLite2-City.mmdb'),
    );

    const { city, country, postal, location } = reader.city(ip);

    const addressDetails = {
      city,
      country,
      postal,
      location,
    };

    return addressDetails;
  }
}
