import { WebServiceClient } from '@maxmind/geoip2-node';

export default class GeoIp2LiteRepo {
  private readonly apiClient: WebServiceClient;

  constructor(
    private readonly apiKey: string,
    private readonly apiAccountId: string,
  ) {
    this.apiClient = new WebServiceClient(apiAccountId, apiKey);
  }

  async getAddressByIp(ip: string) {
    const { city, country, postal, location } = await this.apiClient.city(ip);

    const addressDetails = {
      city,
      country,
      postal,
      location,
    };

    return addressDetails;
  }
}
